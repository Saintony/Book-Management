<template>
  <div class="max-w-2xl p-6 mx-auto mt-10 bg-white rounded shadow">
    <h2 class="mb-4 text-xl font-bold">
      <i class="mr-1 fa-solid fa-pen"></i> แก้ไขข้อมูลหนังสือ
    </h2>
    <div class="space-y-4">
      <input
        v-model="form.title"
        type="text"
        class="input"
        placeholder="ชื่อหนังสือ"
      />
      <input
        v-model="form.author"
        type="text"
        class="input"
        placeholder="ผู้แต่ง"
      />
      <input
        v-model="form.published_year"
        type="number"
        class="input"
        placeholder="ปีที่พิมพ์"
      />

      <select v-model="form.genre" class="text-gray-700 input">
        <option disabled value="">เลือกประเภทหนังสือ</option>
        <option v-for="g in genres" :key="g">{{ g }}</option>
      </select>

      <file-pond
        name="cover"
        label-idle='ลากไฟล์มาวาง หรือ <span class="filepond--label-action">เลือกไฟล์</span>'
        accepted-file-types="image/jpeg, image/png"
        allow-multiple="false"
        :files="files"
        @updatefiles="handleUpload"
      />

      <input
        v-model="form.price"
        type="number"
        class="input"
        placeholder="ราคา (บาท)"
      />
      <div class="flex justify-between gap-4 p-2 mt-4">
        <button
          @click="handleSubmit"
          class="w-full py-2 text-white transition bg-red-600 rounded hover:bg-red-700"
        >
          ยืนยัน
        </button>
        <button
          type="button"
          @click="goBack"
          class="w-full py-2 text-gray-700 transition bg-gray-300 rounded hover:bg-gray-400"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks, updateBook } from "../services/bookService";
import Swal from "sweetalert2";

import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";

const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

export default {
  name: "EditBook",
  components: { FilePond },
  data() {
    return {
      form: {
        id: "",
        title: "",
        author: "",
        published_year: "",
        genre: "",
        cover: "",
        price: "",
      },
      files: [],
      imageOptions: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
      ],
      genres: ["Programming", "Novel", "Travel", "Biomatic", "Bussiness"],
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const all = getBooks();
    console.log("id", id);
    console.log("getBooks", getBooks);

    const book = all.find((b) => b._id === id);
    console.log("book", book);

    if (book) {
      this.form = { ...book };

      if (!this.isBase64Image(book.cover)) {
        const random = Math.floor(Math.random() * this.imageOptions.length);
        this.form.cover = this.imageOptions[random];
      }

      this.files = [
        {
          source: this.form.cover,
          options: { type: "local" },
        },
      ];
    }
  },
  methods: {
    isBase64Image(str) {
      return /^data:image\/(png|jpg|jpeg);base64,/.test(str);
    },
    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    handleUpload(fileItems) {
      if (fileItems.length > 0) {
        // เก็บเป็น Base64
        this.form.cover = fileItems[0].getFileEncodeDataURL();
      }
    },
    handleSubmit() {
      if (!this.form.cover || this.form.cover.trim() === "") {
        Swal.fire({
          icon: "warning",
          title: "ยังไม่ได้เลือกรูปภาพ",
          text: "กรุณาเลือกรูปภาพก่อนบันทึก",
        });
        return;
      }

      Swal.fire({
        title: "ยืนยันแก้ไขข้อมูลหรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          updateBook(this.form);
          Swal.fire("แก้ไขสำเร็จ!", "", "success").then(() => {
            this.$router.push("/");
          });
        }
      });
    },

    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded;
}
.btn {
  @apply px-4 py-2 rounded font-semibold;
}
.btn-primary {
  @apply bg-red-600 text-white hover:bg-red-700;
}
</style>

<template>
  <div class="max-w-xl mx-auto">
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="flex items-center gap-2 mb-6 text-xl font-bold">
        <i class="mr-1 fa-solid fa-plus"></i> เพิ่มข้อมูลหนังสือ
      </h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <input
            v-model="form._id"
            placeholder="รหัสหนังสือ"
            class="input"
            required
          />
        </div>
        <div>
          <input
            v-model="form.title"
            placeholder="ชื่อหนังสือ"
            class="input"
            required
          />
        </div>
        <div>
          <input
            v-model="form.author"
            placeholder="ผู้แต่ง"
            class="input"
            required
          />
        </div>
        <div>
          <input
            v-model.number="form.published_year"
            type="number"
            placeholder="ปีที่พิมพ์"
            class="input"
            required
          />
        </div>

        <!-- Dropdown ประเภทหนังสือ -->
        <div>
          <select
            v-model="form.genre"
            class="input"
            :class="{ 'text-gray-400': !form.genre, 'text-black': form.genre }"
            required
          >
            <option disabled value="">เลือกประเภทหนังสือ</option>
            <option
              v-for="option in genreOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <div>
          <input
            v-model.number="form.price"
            type="number"
            placeholder="ราคา (บาท)"
            class="input"
          />
        </div>

        <!-- อัปโหลดรูปภาพ -->
        <div class="mb-4">
          <span style="color: #9ca3af">อัพโหลดรูปภาพ</span>
          <FilePond
            name="cover"
            label-idle='ลากไฟล์มาวาง หรือ <span class="filepond--label-action">เลือกไฟล์</span>'
            accepted-file-types="image/jpeg, image/png"
            allow-multiple="false"
            :files="files"
            @updatefiles="handleUpload"
          />
          <!-- <div v-if="form.cover" class="mt-2">
            <img :src="form.cover" alt="preview" class="w-32 rounded shadow" />
          </div> -->
        </div>

        <!-- ปุ่ม -->
        <div class="flex justify-between gap-4 p-2 mt-4">
          <button
            type="submit"
            class="w-full py-2 text-white transition bg-red-600 rounded hover:bg-red-700"
          >
            บันทึกข้อมูล
          </button>
          <button
            type="button"
            @click="cancel"
            class="w-full py-2 text-gray-700 transition bg-gray-300 rounded hover:bg-gray-400"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { saveBook, getBooks } from "../services/bookService";
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export default {
  name: "AddBook",
  components: {
    FilePond,
  },
  data() {
    return {
      form: {
        _id: "",
        title: "",
        author: "",
        published_year: null,
        genre: "",
        cover: "",
        price: null,
      },
      files: [],
      imageOptions: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
      ],
      genreOptions: ["Programming", "Novel", "Travel", "Biomatic", "Bussiness"],
    };
  },
  methods: {
    async submitForm() {
      const requiredFields = {
        _id: "รหัสหนังสือ",
        title: "ชื่อหนังสือ",
        author: "ผู้แต่ง",
        published_year: "ปีที่พิมพ์",
        genre: "ประเภทหนังสือ",
        price: "ราคา",
      };

      for (const key in requiredFields) {
        const value = this.form[key];
        if (
          value === null ||
          value === "" ||
          (typeof value === "string" && value.trim() === "")
        ) {
          await Swal.fire({
            icon: "warning",
            title: "กรอกข้อมูลไม่ครบ",
            text: `กรุณากรอก${requiredFields[key]}`,
          });
          return;
        }
      }

      const existing = getBooks().find((b) => b._id === this.form._id);
      if (existing) {
        await Swal.fire({
          icon: "error",
          title: "รหัสหนังสือซ้ำ",
          text: "กรุณาใช้รหัสอื่นที่ไม่ซ้ำกัน",
        });
        return;
      }

      if (!this.form.cover) {
        const random = Math.floor(Math.random() * this.imageOptions.length);
        this.form.cover = this.imageOptions[random];
      }

      saveBook({ ...this.form });

      await Swal.fire({
        title: "เพิ่มข้อมูลสำเร็จ!",
        text: "หนังสือถูกเพิ่มในระบบเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      this.$router.push("/");
    },

    cancel() {
      this.$router.push("/");
    },
    handleUpload(files) {
      this.files = files;
      if (files.length > 0) {
        const file = files[0].file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.cover = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.form.cover = "";
      }
    },
  },
};
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500;
}
</style>

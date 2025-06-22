<template>
  <div class="mt-4">
    <div class="flex justify-between">
      <div class="flex items-center gap-1">
        <i class="mb-3 mr-1 fa-solid fa-list"></i>
        <h2 class="mb-4 text-2xl font-bold">รายการข้อมูลหนังสือ</h2>
      </div>
      <div class="flex items-center gap-1">
        <!-- Search -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="ค้นหาหนังสือหรือผู้แต่ง..."
          class="w-64 px-4 py-2 mb-6 border rounded-full"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-48">
      <div
        class="w-10 h-10 border-4 border-red-600 rounded-full border-t-transparent animate-spin"
      ></div>
    </div>
    <!-- No Books State -->
    <div
      v-else-if="!loading && filteredBooks.length === 0"
      class="my-10 text-center text-gray-400"
    >
      ไม่พบข้อมูลหนังสือ
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
      <div
        v-for="book in paginatedBooks"
        :key="book._id"
        class="transition bg-white rounded shadow hover:shadow-md"
      >
        <img
          v-if="book.cover"
          :src="book.cover"
          alt="cover"
          class="object-cover w-full h-48"
        />
        <img
          v-else
          src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
          alt="no cover"
          class="object-cover w-full h-48"
        />
        <div class="p-3">
          <h3 class="text-sm font-semibold truncate">{{ book.title }}</h3>
          <p class="text-xs text-gray-500 truncate">{{ book.author }}</p>
          <p class="mt-1 text-xs font-semibold text-red-600">
            ฿ {{ book.price }}
          </p>

          <!-- Action buttons -->
          <div class="flex justify-between mt-3">
            <router-link
              :to="`/edit/${book._id}`"
              class="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <i class="fas fa-edit fa-sm"></i>
              <span class="text-xs">แก้ไข</span>
            </router-link>
            <button
              @click="deleteBook(book._id)"
              class="flex items-center gap-1 text-red-600 hover:underline"
            >
              <i class="fas fa-trash-alt fa-sm"></i>
              <span class="text-xs">ลบ</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="!loading && filteredBooks.length > 0"
      class="flex justify-center mt-10 space-x-2"
    >
      <button
        class="w-8 h-8 text-sm border rounded"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        ‹
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        class="w-8 h-8 text-sm border rounded"
        :class="{
          'bg-red-600 text-white': currentPage === page,
          'bg-gray-100 hover:bg-gray-200': currentPage !== page,
        }"
      >
        {{ page }}
      </button>

      <button
        class="w-8 h-8 text-sm border rounded"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { getBooks, deleteBook as removeBook } from "../services/bookService";

export default {
  name: "BookList",
  data() {
    return {
      books: [],
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      loading: false,
    };
  },
  computed: {
    filteredBooks() {
      const q = this.searchQuery.toLowerCase();
      return this.books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.pageSize);
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredBooks.slice(start, end);
    },
  },
  watch: {
    searchQuery() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },

  async mounted() {
    this.loading = true;
    setTimeout(() => {
      this.books = getBooks();
      this.loading = false;
    }, 1000);
  },
  methods: {
    async deleteBook(id) {
      const result = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณต้องการลบหนังสือเล่มนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: "ใช่, ลบเลย",
        cancelButtonText: "ยกเลิก",
      });
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);

      if (result.isConfirmed) {
        removeBook(id);
        this.books = getBooks();
        await Swal.fire("ลบสำเร็จ!", "หนังสือถูกลบแล้ว", "success");
      }
    },
  },
};
</script>

<style scoped></style>

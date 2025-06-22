<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Topbar -->
    <div class="bg-white shadow-sm">
      <div
        class="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl"
      >
        <!-- Logo + Menu -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="text-2xl font-extrabold tracking-wide text-red-600">
              Book
            </div>
            <div class="w-px h-6 bg-red-600"></div>
            <div class="text-2xl font-light text-gray-700">Manage</div>
          </div>
        </div>

        <!-- Login -->
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm flex items-center space-x-2"
        >
          <span>👤</span>
          <span>เข้าสู่ระบบ</span>
        </button>
      </div>
    </div>

    <!-- Navbar -->
    <nav class="text-sm text-white bg-black">
      <div
        class="flex items-center justify-between px-4 py-2 mx-auto max-w-7xl"
      >
        <div class="flex space-x-6">
          <RouterLink to="/" class="hover:text-red-400"
            >รายการข้อมูลหนังสือ</RouterLink
          >
          <RouterLink to="/add" class="hover:text-red-400"
            >เพิ่มข้อมูลหนังสือ</RouterLink
          >
          <!-- <RouterLink to="/audio" class="hover:text-red-400"
            >หนังสือเสียง</RouterLink
          > -->
          <!-- <RouterLink to="/lifestyle" class="hover:text-red-400"
            >สินค้าไลฟ์สไตล์</RouterLink
          > -->
          <!-- <RouterLink to="/novel" class="hover:text-red-400">นิยาย</RouterLink> -->
          <!-- <div class="relative cursor-pointer group">
            <span class="hover:text-red-400">อื่น ๆ ▾</span>
            เมนูย่อย (ถ้าต้องการเพิ่ม dropdown จริง)
          </div> -->
        </div>
        <button class="px-3 py-1 text-sm text-black bg-white rounded-full">
          <i class="fa-solid fa-book"> </i>
        </button>
      </div>
    </nav>

    <!-- Main content -->
    <main class="px-4 py-6 mx-auto max-w-7xl">
      <router-view />
    </main>
    <!-- Footer -->
    <footer class="pt-10 pb-6 mt-12 text-sm text-gray-700 bg-gray-100 border-t">
      <div
        class="grid grid-cols-1 gap-8 px-4 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
      >
        <!-- Logo + Social -->
        <div class="col-span-1 space-y-4">
          <div class="flex items-center space-x-2">
            <div class="text-2xl font-extrabold tracking-wide text-red-600">
              Book
            </div>
            <div class="w-px h-6 bg-red-600"></div>
            <div class="text-2xl font-light text-gray-700">Manage</div>
          </div>
          <div class="flex gap-4 text-xl text-red-600">
            <a href="#" title="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="#" title="TikTok"><i class="fab fa-tiktok"></i></a>
            <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="#" title="Line"><i class="fab fa-line"></i></a>
          </div>
          <p class="text-xs">
            ติดต่อเรา<br /><span class="font-medium"
              >sittikorn4730@gmail.com</span
            >
          </p>
        </div>

        <!-- Section 1 -->
        <div>
          <h3 class="mb-2 font-semibold">หนังสือของเรา</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:text-red-500">หนังสือเล่ม</a></li>
            <li><a href="#" class="hover:text-red-500">E-Book</a></li>
            <li><a href="#" class="hover:text-red-500">หนังสือเสียง</a></li>
            <li><a href="#" class="hover:text-red-500">E-Voucher</a></li>
          </ul>
        </div>

        <!-- Section 2 -->
        <div>
          <h3 class="mb-2 font-semibold">นโยบาย</h3>
          <ul class="space-y-1">
            <li>
              <a href="#" class="hover:text-red-500">ข้อตกลงการใช้บริการ</a>
            </li>
            <li>
              <a href="#" class="hover:text-red-500">นโยบายความเป็นส่วนตัว</a>
            </li>
            <li>
              <a href="#" class="hover:text-red-500">นโยบายการใช้คุกกี้</a>
            </li>
            <li>
              <a href="#" class="hover:text-red-500"
                >การขอใช้สิทธข้อมูลส่วนบุคคล</a
              >
            </li>
          </ul>
        </div>

        <!-- Section 3 -->
        <div>
          <h3 class="mb-2 font-semibold">ช่วยเหลือ</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:text-red-500">คำถามที่พบบ่อย</a></li>
            <li><a href="#" class="hover:text-red-500">บทความ</a></li>
            <li><a href="#" class="hover:text-red-500">ดาวน์โหลดแอป</a></li>
          </ul>
        </div>

        <!-- Section 4 -->
        <div>
          <h3 class="mb-2 font-semibold">ข้อมูล บมจ</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:text-red-500">นักลงทุนสัมพันธ์</a></li>
            <li><a href="#" class="hover:text-red-500">ร่วมงานกับเรา</a></li>
            <li>
              <a href="#" class="hover:text-red-500"
                >สำหรับร้านหนังสือ / องค์กร</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="px-4 mt-10 text-xs text-center text-gray-400">
        © 2025 Book-Manage. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>

<style scoped></style>

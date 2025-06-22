<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <!-- <div
    class="flex items-center justify-center min-h-screen text-xl font-bold text-blue-600 bg-gray-100"
  >
    ✅ Tailwind CSS is working!
  </div> -->
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

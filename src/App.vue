<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Navbar />
  <main class="font-bold text-4xl">
    <RouterView></RouterView>
  </main>

  <footer class="footer footer-center p-4 bg-neutral text-neutral-content">
  <aside>
    <p>Mad With 💖 By Omer Mahdi</p>
  </aside>
</footer>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <RouterView class="flex-grow px-10 py-10 overflow-hidden" />
    <PageFooter />
  </div>
</template>

<style></style>

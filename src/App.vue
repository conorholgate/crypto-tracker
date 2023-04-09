<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import PageFooter from './components/PageFooter.vue'
import { useCryptoStore } from '@/stores/cryptoStore'

const cryptoStore = useCryptoStore()
cryptoStore.getPrices()
</script>

<template>
  <div class="flex flex-col justify-between min-h-screen">
    <div>
      <NavBar />
      <div class="flex justify-center">
        <RouterView class="flex-grow px-4 py-10 overflow-hidden max-w-7xl" />
      </div>
    </div>
    <PageFooter />
  </div>
</template>

<style></style>

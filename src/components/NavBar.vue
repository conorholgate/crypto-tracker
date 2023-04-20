<template>
  <div class="flex justify-center h-16 bg-white">
    <div class="flex items-center justify-between w-full px-4 max-w-7xl">
      <div class="font-bold">Crypto-Tracker App</div>
      <div class="flex items-center" v-if="route.path === '/'">
        <DropDownMenu class="z-20" :items="cryptoStore.availableCurrencies" :value="cryptoStore.sort.currency" @itemSelected="setCurrency" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCryptoStore } from '@/stores/cryptoStore'
import { useRoute } from 'vue-router'
import DropDownMenu from '../components/DropDownMenu.vue'

const cryptoStore = useCryptoStore()
const route = useRoute()

const setCurrency = currency => {
  cryptoStore.setCurrency(currency)
}
</script>

<style scoped></style>

<template>
  <main>
    <div class="flex flex-col" :class="isLoading ? 'opacity-20' : 'opacity-100'">
      <div class="flex items-center justify-end">
        <DropDownMenu :label="'Show'" :items="cryptoStore.availableShowQuantities" :value="cryptoStore.sort.selectedLimit" @itemSelected="setQuantity" />
      </div>
      <div class="inline-block min-w-full py-2 align-middle">
        <CryptoTable />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useCryptoStore } from '@/stores/cryptoStore'
import CryptoTable from '../components/CryptoTable.vue'
import DropDownMenu from '../components/DropDownMenu.vue'
import { computed } from 'vue'

const cryptoStore = useCryptoStore()
let isLoading = computed(() => {
  return cryptoStore.loading
})
const setQuantity = limit => {
  cryptoStore.setLimit(limit)
}
</script>

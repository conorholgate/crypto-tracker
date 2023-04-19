<template>
  <div v-if="coins.length >= cryptoStore.sort.selectedLimit" class="mt-4">
    <div class="justify-center hidden md:flex">
      <nav class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a class="relative inline-flex items-center px-2 py-2 mr-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-l-md hover:bg-gray-50" @click="previousPage()">
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
        </a>
        <div class="flex items-center" v-for="(number, index) in pages" :key="index">
          <div
            class="relative w-12 p-4 mr-1 text-sm font-medium text-center text-gray-500 bg-white border border-gray-300 cursor-pointer hover:bg-gray-50"
            :class="activePage === pages[index] ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : ''"
            @click="goToPage(index)"
          >
            {{ number }}
          </div>
        </div>
        <a class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-r-md hover:bg-gray-50" @click="nextPage()">
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
    <div class="flex items-center justify-between md:hidden">
      <button class="flex items-center px-4 py-2.5 bg-white rounded-md" @click="previousPage()"><ChevronLeftIcon class="w-5 h-5" aria-hidden="true" /> <span>Previous</span></button>
      <span>Page {{ activePage }}</span>
      <button class="flex items-center px-4 py-2.5 bg-white rounded-md" @click="nextPage()"><span>Next</span><ChevronRightIcon class="w-5 h-5" aria-hidden="true" /></button>
    </div>
  </div>
</template>
<script setup>
import { ref } from '@vue/reactivity'
import { useCryptoStore } from '@/stores/cryptoStore'
import { SearchIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

defineProps({
  coins: Array,
})

const cryptoStore = useCryptoStore()
const { activePage } = storeToRefs(cryptoStore)
let pages = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const nextPage = () => {
  activePage.value++
  if (activePage.value > 10) {
    pages.value.forEach((page, index) => {
      pages.value[index]++
    })
  }
  cryptoStore.nextPage(activePage)
}
const previousPage = () => {
  activePage.value > 1 ? activePage.value-- : ''
  if (activePage.value === pages.value[0]) {
    if (activePage.value > 1) {
      pages.value.forEach((page, index) => {
        pages.value[index]--
      })
    }
  }
  cryptoStore.previousPage(activePage)
}
const goToPage = index => {
  activePage.value = pages.value[index]
  cryptoStore.goToPage(index, activePage)
}
</script>

<style lang="scss" scoped></style>

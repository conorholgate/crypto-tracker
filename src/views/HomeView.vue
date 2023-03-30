<template>
  <main>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="flex items-center justify-end">
          <p class="">Show</p>
          <div class="p-2 ml-2 bg-white rounded-md cursor-pointer w-14 focus:outline-none">
            <div class="flex" @click="showLimit = !showLimit">
              {{ cryptoStore.sort.selectedLimit }}
              <span> <ChevronDownIcon class="w-5 h-5" aria-hidden="true" /></span>
            </div>
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="-translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="-translate-y-1 opacity-0"
            >
              <div v-if="showLimit" class="bg-white rounded-b-md w-14">
                <div v-for="quantity in cryptoStore.availableShowQuantities" :key="quantity">
                  <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="cryptoStore.sort.selectedLimit === quantity ? 'bg-gray-200' : ''" @click="onSelectLimit(quantity)">{{ quantity }}</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="inline-block min-w-full py-2 align-middle">
          <CryptoTable />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useCryptoStore } from '@/stores/cryptoStore'
import { computed, onMounted } from '@vue/runtime-core'
import { SearchIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import CryptoTable from '../components/CryptoTable.vue'

const cryptoStore = useCryptoStore()
// onMounted(() => {
//   cryptoStore.getPrices()
// })

let showLimit = ref(false)
const onSelectLimit = limit => {
  cryptoStore.setLimit(limit)
  showLimit.value = false
}
</script>

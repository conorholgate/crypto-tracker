<template>
  <div class="flex justify-center h-16 bg-white">
    <div class="flex items-center justify-between w-full px-4 max-w-7xl">
      <div class="font-bold">Crypto-Tracker App</div>
      <div class="flex items-center" v-if="route.path === '/'">
        <div class="flex pt-5 pb-5 cursor-pointer focus:outline-none">
          <div class="flex" @click="showCurrencyMenu = !showCurrencyMenu">
            <div>{{ cryptoStore.sort.currency }}</div>
            <ChevronDownIcon class="w-5 h-5" aria-hidden="true" />
          </div>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="-translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-1 opacity-0"
          >
            <div v-if="showCurrencyMenu" class="absolute z-20 bg-white rounded-b-md top-16">
              <div v-for="currency in cryptoStore.availableCurrencies" :key="currency">
                <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="cryptoStore.sort.currency === currency ? 'bg-gray-200' : ''" @click="onSelectCurrency(currency)">{{ currency }}</p>
              </div>
            </div>
          </transition>

          <!-- <div class="relative text-gray-600 focus-within:text-gray-600">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon class="w-5 h-5" aria-hidden="true" />
        </div>
        <input id="search" class="block w-full py-2 pl-10 pr-3 text-sm leading-5 text-black placeholder-gray-600 bg-gray-100 rounded-md focus:outline-none lg:text-md" placeholder="Filter" type="search" name="search" v-model="cryptoStore.search" />
      </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { SearchIcon, ChevronDownIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'
import { useCryptoStore } from '@/stores/cryptoStore'
import { useRoute } from 'vue-router'

const cryptoStore = useCryptoStore()
const route = useRoute()

let showCurrencyMenu = ref(false)

const onSelectCurrency = currency => {
  cryptoStore.setCurrency(currency)
  showCurrencyMenu.value = false
}
</script>

<style scoped></style>

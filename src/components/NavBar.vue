<template>
    <div class="flex items-center justify-between h-16 bg-white">
        <div class="ml-10 font-bold">
            Crypto-Tracker App
        </div>
        <div class="flex items-center mr-10">
            <div class="flex mr-5 cursor-pointer focus:outline-none" @click="onOpenCurrencyMenu">
                <button v-if="showCurrencyMenu" tabindex="-1" class="fixed inset-0 w-full h-full bg-black opacity-0 cursor-default"></button>
                <div>{{ selectedCurrency }}</div>
                <ChevronDownIcon class="w-5 h-5" aria-hidden="true" />
                <transition enter-active-class="transition duration-200 ease-out" enter-from-class="-translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-1 opacity-0">
                    <div v-if="showCurrencyMenu" class="absolute bg-white rounded-b-md top-16">
                        <div>
                            <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="selectedCurrency === 'GBP' ? 'bg-gray-200' : ''" @click="onSelectCurrency('GBP')">GBP</p>
                            <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="selectedCurrency === 'USD' ? 'bg-gray-200' : ''" @click="onSelectCurrency('USD')">USD</p>
                            <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="selectedCurrency === 'EUR' ? 'bg-gray-200' : ''" @click="onSelectCurrency('EUR')">EUR</p>
                        </div>
                    </div>
                </transition>
            </div>
            
            <div class="relative text-gray-600 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon class="w-5 h-5" aria-hidden="true" />
                </div>
                <input id="search" class="block w-full py-2 pl-10 pr-3 text-sm leading-5 text-black placeholder-gray-600 bg-gray-100 rounded-md focus:outline-none lg:text-md" 
                    placeholder="Search" 
                    type="search" 
                    name="search"
                    v-model="prices.search" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { SearchIcon, ChevronDownIcon } from '@heroicons/vue/solid'
import { ref } from 'vue';
import { usePricesStore } from '@/stores/pricesStore'

const prices = usePricesStore()

var showCurrencyMenu = ref(false)
var selectedCurrency = ref('GBP')
const onOpenCurrencyMenu = () => {
    showCurrencyMenu.value = !showCurrencyMenu.value
}
const onSelectCurrency = (currency) => {
    prices.setCurrency(currency)
    selectedCurrency.value = currency   
}
</script>

<style scoped>

</style>
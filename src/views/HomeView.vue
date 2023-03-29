<template>
  <main>
    <div class="">
      <div class="flex flex-col">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="flex items-center justify-end px-8">
            <p class="">Show</p>
            <div class="p-2 ml-2 bg-white rounded-md cursor-pointer w-14 focus:outline-none">
              <div class="flex" @click="showLimit = !showLimit">
                {{ cryptoStore.sort.selectedLimit }} <span> <ChevronDownIcon class="w-5 h-5" aria-hidden="true" /></span>
              </div>
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="-translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="-translate-y-1 opacity-0"
              >
                <div v-if="showLimit" class="absolute mr-2 bg-white rounded-b-md w-14 lg:right-8 right-12">
                  <div>
                    <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="cryptoStore.sort.selectedLimit === '25' ? 'bg-gray-200' : ''" @click="onSelectLimit('25')">25</p>
                    <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="cryptoStore.sort.selectedLimit === '50' ? 'bg-gray-200' : ''" @click="onSelectLimit('50')">50</p>
                    <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="cryptoStore.sort.selectedLimit === '100' ? 'bg-gray-200' : ''" @click="onSelectLimit('100')">100</p>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="">
                <tr class="w-full">
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer sm:pl-6 md:pl-0" @click="sortBy('market_cap')">Rank #</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer" @click="sortBy('name')">Name</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer" @click="sortBy('price')">Price</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer" @click="sortBy('percent_change_24h')">24h%</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer" @click="sortBy('percent_change_7d')">7d%</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer" @click="sortBy('market_cap')">Market Cap</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer" @click="sortBy('volume_24h')">Volume(24h)</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer" @click="sortBy('total_supply')">Supply</th>
                </tr>
              </thead>
              <tbody v-if="filteredCoins.length" class="divide-y divide-gray-200">
                <template v-if="cryptoStore.sort.currency === 'GBP'">
                  <tr v-for="coin in filteredCoins" :key="coin.id">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 md:pl-0">{{ coin.cmc_rank }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.name }} ({{ coin.symbol }})</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.GBP.price) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.GBP.percent_change_24h) === 1 ? 'text-green-600' : 'text-red-600'">
                      {{ coin.quote.GBP.percent_change_24h.toFixed(2) }}
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.GBP.percent_change_7d) === 1 ? 'text-green-600' : 'text-red-600'">
                      {{ coin.quote.GBP.percent_change_7d.toFixed(2) }}
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.GBP.market_cap) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.GBP.volume_24h) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {{ Math.round(coin.total_supply).toLocaleString() }}
                      <span v-if="coin.max_supply"> / {{ Math.round(coin.max_supply).toLocaleString() }}</span> {{ coin.symbol }}
                    </td>
                  </tr>
                </template>
                <template v-if="cryptoStore.sort.currency === 'USD'">
                  <tr v-for="coin in filteredCoins" :key="coin.id">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 md:pl-0">{{ coin.cmc_rank }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.name }} ({{ coin.symbol }})</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.USD.price) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.USD.percent_change_24h) === 1 ? 'text-green-600' : 'text-red-600'">
                      {{ coin.quote.USD.percent_change_24h.toFixed(2) }}
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.USD.percent_change_7d) === 1 ? 'text-green-600' : 'text-red-600'">
                      {{ coin.quote.USD.percent_change_7d.toFixed(2) }}
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.USD.market_cap) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.USD.volume_24h) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {{ Math.round(coin.total_supply).toLocaleString() }}
                      <span v-if="coin.max_supply"> / {{ Math.round(coin.max_supply).toLocaleString() }} </span>{{ coin.symbol }}
                    </td>
                  </tr>
                </template>
                <template v-if="cryptoStore.sort.currency === 'EUR'">
                  <tr v-for="coin in filteredCoins" :key="coin.id">
                    <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 md:pl-0">{{ coin.cmc_rank }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.name }} ({{ coin.symbol }})</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.EUR.price) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.EUR.percent_change_24h) === 1 ? 'text-green-600' : 'text-red-600'">
                      {{ coin.quote.EUR.percent_change_24h.toFixed(2) }}
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.EUR.percent_change_7d) === 1 ? 'text-green-600' : 'text-red-600'">
                      {{ coin.quote.EUR.percent_change_7d.toFixed(2) }}
                    </td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.EUR.market_cap) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.EUR.volume_24h) }}</td>
                    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {{ Math.round(coin.total_supply).toLocaleString() }}
                      <span v-if="coin.max_supply"> / {{ Math.round(coin.max_supply).toLocaleString() }} </span>{{ coin.symbol }}
                    </td>
                  </tr>
                </template>
              </tbody>
              <tbody v-else>
                <tr class="pt-6">
                  No Coins Found
                </tr>
              </tbody>
            </table>
            <div v-if="filteredCoins.length >= cryptoStore.sort.selectedLimit" class="flex justify-center mt-4">
              <div class="">
                <nav class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <a class="relative inline-flex items-center px-2 py-2 mr-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-l-md hover:bg-gray-50" @click="activePage > 1 ? activePage-- : '', previousPage()">
                    <span class="sr-only">Previous</span>
                    <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
                  </a>
                  <div class="flex items-center" v-for="(number, index) in pages" :key="index">
                    <div class="relative w-12 p-4 mr-1 text-sm font-medium text-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-50" :class="activePage === pages[index] ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : ''">
                      {{ number }}
                    </div>
                  </div>
                  <a class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-r-md hover:bg-gray-50" @click="activePage++, nextPage()">
                    <span class="sr-only">Next</span>
                    <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
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

const cryptoStore = useCryptoStore()
onMounted(() => {
  cryptoStore.getPrices()
})
const sortBy = value => {
  cryptoStore.sortBy(value)
}
var showLimit = ref(false)
const onSelectLimit = limit => {
  cryptoStore.setLimit(limit)
  showLimit.value = false
}
var activePage = ref(1)
var pages = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const nextPage = () => {
  if (activePage.value > 10) {
    pages.value.forEach((page, index) => {
      pages.value[index]++
    })
  }
  cryptoStore.nextPage()
}
const previousPage = () => {
  if (activePage.value === pages.value[0]) {
    if (activePage.value > 1) {
      pages.value.forEach((page, index) => {
        pages.value[index]--
      })
    }
  }
  cryptoStore.previousPage()
}
const filteredCoins = computed(() => {
  var coins = []
  coins = cryptoStore.allCoins
  if (cryptoStore.search) {
    coins = coins.filter(coin => {
      if (coin.name.toLowerCase().indexOf(cryptoStore.search.toLowerCase()) > -1 || coin.symbol.toLowerCase().indexOf(cryptoStore.search.toLowerCase()) > -1) {
        return coin
      }
    })
  }
  return coins
})
const currencyFormatter = value => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cryptoStore.sort.currency,
  })
  return formatter.format(value)
}
</script>

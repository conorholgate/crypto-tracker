<template>
  <table class="w-full divide-y divide-gray-300 table-fixed">
    <thead class="">
      <tr class="">
        <th
          scope="col"
          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer sm:pl-6 md:pl-0 truncate whitespace-nowrap"
          @click="sortBy('market_cap')"
        >
          Rank #
        </th>
        <th
          scope="col"
          class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer truncate whitespace-nowrap"
          @click="sortBy('name')"
        >
          Name
        </th>
        <th
          scope="col"
          class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer truncate whitespace-nowrap"
          @click="sortBy('price')"
        >
          Price
        </th>
        <th
          scope="col"
          class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer truncate whitespace-nowrap"
          @click="sortBy('percent_change_24h')"
        >
          24h%
        </th>
        <th
          scope="col"
          class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer truncate whitespace-nowrap"
          @click="sortBy('percent_change_7d')"
        >
          7d%
        </th>
        <th
          scope="col"
          class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer truncate whitespace-nowrap"
          @click="sortBy('market_cap')"
        >
          Market Cap
        </th>
        <th
          scope="col"
          class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer truncate whitespace-nowrap"
          @click="sortBy('volume_24h')"
        >
          Volume(24h)
        </th>
        <th
          scope="col"
          class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer truncate whitespace-nowrap"
          @click="sortBy('total_supply')"
        >
          Supply
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <template v-if="filteredCoins.length">
        <tr v-for="coin in filteredCoins" :key="coin.id">
          <td
            class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6 md:pl-0"
          >
            {{ coin.cmc_rank }}
          </td>
          <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
            {{ coin.name }} ({{ coin.symbol }})
          </td>
          <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
            {{ currencyFormatter(coin.quote[cryptoStore.sort.currency].price) }}
          </td>
          <td
            class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap"
            :class="
              Math.sign(coin.quote[cryptoStore.sort.currency].percent_change_24h) === 1
                ? 'text-green-600'
                : 'text-red-600'
            "
          >
            {{ coin.quote[cryptoStore.sort.currency].percent_change_24h.toFixed(2) }}
          </td>
          <td
            class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap"
            :class="
              Math.sign(coin.quote[cryptoStore.sort.currency].percent_change_7d) === 1
                ? 'text-green-600'
                : 'text-red-600'
            "
          >
            {{ coin.quote[cryptoStore.sort.currency].percent_change_7d.toFixed(2) }}
          </td>
          <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
            {{ currencyFormatter(coin.quote[cryptoStore.sort.currency].market_cap) }}
          </td>
          <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
            {{ currencyFormatter(coin.quote[cryptoStore.sort.currency].volume_24h) }}
          </td>
          <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
            {{ Math.round(coin.total_supply).toLocaleString() }}
            <span v-if="coin.max_supply">
              / {{ Math.round(coin.max_supply).toLocaleString() }}</span
            >
            {{ coin.symbol }}
          </td>
        </tr>
      </template>
      <template v-if="!filteredCoins.length">
        <tr>
          <td colspan="8" class="pt-6 text-center text-gray-500">No coins found</td>
          <!-- <div class="w-full place-content-center">No coins found</div> -->
        </tr>
      </template>
    </tbody>
  </table>
  <div>
    <Pagination :coins="filteredCoins" />
  </div>
</template>

<script setup>
import { useCryptoStore } from '@/stores/cryptoStore'
import { computed } from '@vue/runtime-core'
import Pagination from '../components/Pagniation.vue'

const cryptoStore = useCryptoStore()
const filteredCoins = computed(() => {
  let coins = []
  coins = cryptoStore.allCoins
  if (cryptoStore.search) {
    coins = coins.filter(coin => {
      if (
        coin.name.toLowerCase().indexOf(cryptoStore.search.toLowerCase()) > -1 ||
        coin.symbol.toLowerCase().indexOf(cryptoStore.search.toLowerCase()) > -1
      ) {
        return coin
      }
    })
  }
  return coins
})
const currencyFormatter = value => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cryptoStore.sort.currency,
  })
  return formatter.format(value)
}
const sortBy = value => {
  cryptoStore.sortBy(value)
}
</script>

<style lang="scss" scoped></style>
<template>
    <main>
        <div class="">
            <div class="flex flex-col">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer sm:pl-6 md:pl-0">Rank #</th>
                                    <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer" @click="sortByName">Name</th>
                                    <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">Price</th>
                                    <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">24h%</th>
                                    <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">7d%</th>
                                    <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">Market Cap</th>
                                    <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">Volume(24h)</th>
                                    <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">Supply</th>
                                </tr>
                            </thead>
                            <tbody v-if="filteredCoins.length" class="divide-y divide-gray-200">
                                <template v-if="prices.currency === 'GBP'">
                                    <tr v-for="(coin) in filteredCoins" :key="coin.id">
                                        <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 md:pl-0">{{ coin.cmc_rank }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.name }} ({{ coin.symbol }})</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.GBP.price) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.GBP.percent_change_24h) === 1 ? 'text-green-600' : 'text-red-600'">{{ coin.quote.GBP.percent_change_24h.toFixed(2) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.GBP.percent_change_7d) === 1 ? 'text-green-600' : 'text-red-600'">{{ coin.quote.GBP.percent_change_7d.toFixed(2) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.GBP.market_cap) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.GBP.volume_24h) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ Math.round(coin.total_supply).toLocaleString() }} <span v-if="coin.max_supply"> / {{ Math.round(coin.max_supply).toLocaleString() }}</span>{{ coin.symbol }}</td>
                                    </tr>
                                </template>
                                <template v-if="prices.currency === 'USD'">
                                    <tr v-for="(coin) in prices.allCoins" :key="coin.id">
                                        <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 md:pl-0">{{ coin.cmc_rank }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.name }} ({{ coin.symbol }})</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.USD.price) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.USD.percent_change_24h) === 1 ? 'text-green-600' : 'text-red-600'">{{ coin.quote.USD.percent_change_24h.toFixed(2) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.USD.percent_change_7d) === 1 ? 'text-green-600' : 'text-red-600'">{{ coin.quote.USD.percent_change_7d.toFixed(2) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.USD.market_cap) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.USD.volume_24h) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ Math.round(coin.total_supply).toLocaleString() }} <span v-if="coin.max_supply"> / {{ Math.round(coin.max_supply).toLocaleString() }} </span>{{ coin.symbol }}</td>
                                    </tr>
                                </template>
                                <template v-if="prices.currency === 'EUR'">
                                    <tr v-for="(coin) in prices.allCoins" :key="coin.id">
                                        <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 md:pl-0">{{ coin.cmc_rank }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.name }} ({{ coin.symbol }})</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.EUR.price) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.EUR.percent_change_24h) === 1 ? 'text-green-600' : 'text-red-600'">{{ coin.quote.EUR.percent_change_24h.toFixed(2) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap" :class="Math.sign(coin.quote.EUR.percent_change_7d) === 1 ? 'text-green-600' : 'text-red-600'">{{ coin.quote.EUR.percent_change_7d.toFixed(2) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.EUR.market_cap) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ currencyFormatter(coin.quote.EUR.volume_24h) }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ Math.round(coin.total_supply).toLocaleString() }} <span v-if="coin.max_supply"> / {{ Math.round(coin.max_supply).toLocaleString() }} </span>{{ coin.symbol }}</td>
                                    </tr>
                                </template>
                                
                            </tbody>
                            <tbody v-else>
                                <tr class="pt-6">
                                    No Coins Found
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { ref } from '@vue/reactivity';
    import { usePricesStore } from '@/stores/pricesStore'
    import { computed, onMounted } from '@vue/runtime-core';

    const prices = usePricesStore()
    onMounted(() => {
        prices.getPrices() // <div>
    })

    const sortByName = () => {
        prices.sortByName()
    }

    const filteredCoins = computed(() => {
        var coins = []
        coins = prices.allCoins
        if (prices.search) {
            coins = coins.filter(coin => {
                if (coin.name.toLowerCase().indexOf(prices.search.toLowerCase()) > -1 || coin.symbol.toLowerCase().indexOf(prices.search.toLowerCase()) > -1) {
                    return coin
                }
            })
        }
        return coins
    })

    const currencyFormatter = (value) => {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: prices.currency
        })
        return formatter.format(value)
    }
</script>

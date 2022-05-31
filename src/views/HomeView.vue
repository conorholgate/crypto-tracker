<template>
    <main>
        <div class="text-xl">
            <button @click="getPrices">get prices</button>
        </div>
        <!-- <div v-if="allCoins.length">
            <div v-for="(coin) in allCoins" :key="coin.id">
                {{ coin.name }} / {{ coin.quote.USD.price }}
            </div>
        </div> -->
        <template v-if="allCoins">
            <div class="">
                <div class="flex flex-col mt-8">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Rank #</th>
                                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Price</th>
                                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">24h%</th>
                                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">7d%</th>
                                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Market Cap</th>
                                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Volume(24h)</th>
                                        <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Supply</th>
                                    </tr>
                                </thead>
                                <tbody v-if="allCoins.length" class="divide-y divide-gray-200">
                                    <tr v-for="(coin) in allCoins" :key="coin.id">
                                        <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 md:pl-0">{{ coin.cmc_rank }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.name }} ({{ coin.symbol }})</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.quote.USD.price }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.quote.USD.percent_change_24h }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.quote.USD.percent_change_7d }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.quote.USD.market_cap }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.quote.USD.volume_24h }}</td>
                                        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{{ coin.total_supply }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr class="pt-6">
                                        Loading...
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </main>
</template>

<script setup>
    import { ref } from '@vue/reactivity';
    import axios from 'axios';

    const allCoins = ref([])
    const getPrices = () => {
        axios.get('http://localhost:8080/coinmarketcap').then(res => {
            // console.log(res.data);
            allCoins.value = res.data.data
            console.log(allCoins.value[0].name);
        })
    }
</script>

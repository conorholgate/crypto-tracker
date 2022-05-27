<template>
    <main>
        <div class="text-7xl">
            <button @click="getPrices">get prices</button>
        </div>
        <div v-if="allCoins.length">
            <div v-for="(coin) in allCoins" :key="coin.id">
                {{ coin.name }} / {{ coin.quote.USD.price }}
            </div>
        </div>
        
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

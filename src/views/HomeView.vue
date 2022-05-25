<template>
    <main>
        <div class="text-7xl">
            <button @click="getPrices">get prices</button>
        </div>
        
    </main>
</template>

<script setup>
    import axios from 'axios';
    const getPrices = () => {
        axios.get('http://localhost:8080/prices').then(res => {
            console.log(res.data);
        })
    }
</script>

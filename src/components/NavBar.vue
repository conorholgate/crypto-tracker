<template>
    <div class="flex justify-between items-center bg-white h-16">
        <div class="ml-10 font-bold">
            Crypto-Tracker App
        </div>
        <div class="mr-10">
            <div class="relative text-gray-600 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon class="w-5 h-5" aria-hidden="true" />
                </div>
                <input id="search" class="block w-full py-2 pl-10 pr-3 text-sm leading-5 text-black placeholder-gray-600 bg-gray-100 focus:outline-none lg:text-md rounded-md" 
                    placeholder="Search" 
                    type="search" 
                    name="search" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { SearchIcon } from '@heroicons/vue/solid'

</script>

<style scoped>

</style>
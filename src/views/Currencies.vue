<template>
  <div>
    <div v-if="cryptoStore.selectedCoin && !cryptoStore.loading">
      <div class="flex items-center mb-2">
        <img :src="cryptoStore.selectedCoin?.logo" alt="" class="w-10 h-10 mr-2" />
        <span class="mr-2 text-2xl font-bold">{{ cryptoStore.selectedCoin?.name }}</span>
        <div class="px-2 py-1 ml-2 text-sm bg-gray-200 border rounded-lg">
          {{ cryptoStore.selectedCoin?.symbol }}
        </div>
      </div>
      <div v-if="getRank" class="inline-block px-2 py-2 text-sm bg-gray-200 border rounded-lg">
        {{ `Rank #${getRank}` }}
      </div>
      <div class="w-1/2 mt-10">
        {{ cryptoStore.selectedCoin?.description }}
      </div>
    </div>
    <div v-else>Loading ...</div>
  </div>
</template>

<script setup>
import { useCryptoStore } from '@/stores/cryptoStore'
import { computed } from 'vue'

const cryptoStore = useCryptoStore()

const getRank = computed(() => {
  return cryptoStore.allCoins.find(c => c.id === cryptoStore.selectedCoin?.id)?.cmc_rank
})
</script>

<style lang="scss" scoped></style>

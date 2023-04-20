<template>
  <div class="flex items-center">
    <p class="" v-if="label">{{ label }}</p>
    <div class="relative p-2 ml-2 bg-white rounded-md cursor-pointer w-14 focus:outline-none">
      <div class="flex" @click="showMenu = !showMenu">
        {{ value }}
        <span> <ChevronDownIcon class="w-5 h-5" aria-hidden="true" /></span>
      </div>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-1 opacity-0"
      >
        <div v-if="showMenu" class="absolute bg-white right-[0.2px] rounded-b-md w-14">
          <div v-for="item in items" :key="item">
            <p class="px-4 py-1 cursor-pointer hover:bg-gray-200" :class="value === item ? 'bg-gray-200' : ''" @click="onSelectItem(item)">{{ item }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

defineProps({
  label: String,
  items: Array,
  value: [String, Number],
})
const emit = defineEmits(['itemSelected'])

let showMenu = ref(false)
const onSelectItem = item => {
  emit('itemSelected', item)
  showMenu.value = false
}
</script>

<style lang="scss" scoped></style>

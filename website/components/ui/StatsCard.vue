<template>
  <NuxtLink 
    v-if="to"
    :to="to"
    class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer group relative"
  >
    <div :class="['text-4xl font-bold mb-2', valueColor]">{{ value }}</div>
    <div class="text-gray-600 text-sm mb-3">{{ label }}</div>
    <div class="flex items-center justify-center gap-1 text-primary-600 text-xs font-medium group-hover:gap-2 transition-all">
      <span>Подробнее</span>
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </NuxtLink>
  <div 
    v-else
    class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition"
  >
    <div :class="['text-4xl font-bold mb-2', valueColor]">{{ value }}</div>
    <div class="text-gray-600 text-sm">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number
  label: string
  valueColor?: string
  to?: string
}>()
</script>

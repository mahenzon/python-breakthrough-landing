<template>
  <span 
    class="transform transition-transform inline-block text-gray-600" 
    :class="{ 'rotate-180': isExpanded }"
  >
    ▼
  </span>
</template>

<script setup lang="ts">
defineProps<{
  isExpanded: boolean
}>()
</script>

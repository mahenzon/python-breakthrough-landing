<template>
  <div class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
    <div class="flex items-center gap-3 mb-4">
      <span class="text-4xl">{{ platform.emoji }}</span>
      <h3 class="text-2xl font-bold text-primary-600">{{ platform.name }}</h3>
    </div>
    <p class="text-lg font-medium mb-3">{{ platform.title }}</p>
    <p class="text-gray-700 mb-4">{{ platform.description }}</p>
    <a
      :href="platform.url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block w-full text-center px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-lg mb-4"
    >
      {{ platform.buttonText }} →
    </a>
    <div class="bg-gray-50 p-4 rounded">
      <p class="text-sm text-gray-600">{{ platform.noteIcon }} {{ platform.note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CoursePlatform } from '~/types/content'

interface Props {
  platform: CoursePlatform
}

defineProps<Props>()
</script>

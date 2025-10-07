<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center">{{ $t('home.requirements') }}</h2>
        <p class="text-lg text-gray-700 mb-4 text-center">{{ $t('home.requirementsText') }}</p>
        <ul class="list-disc list-inside space-y-2 max-w-2xl mx-auto">
          <li
            v-for="(item, index) in requirementsItems"
            :key="index"
            class="text-lg text-gray-700"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getHomeContent } = useHomeContent()
const homeContent = await getHomeContent()
const requirementsItems = homeContent.requirements
</script>

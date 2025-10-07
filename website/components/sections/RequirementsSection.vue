<template>
  <CollapsibleSection bg-class="bg-white">
    <template #title>{{ $t('home.requirements') }}</template>
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
  </CollapsibleSection>
</template>

<script setup lang="ts">
const { getHomeContent } = useHomeContent()
const homeContent = await getHomeContent()
const requirementsItems = homeContent.requirements
</script>

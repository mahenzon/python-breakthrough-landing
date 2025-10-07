<template>
  <CollapsibleSection bg-class="bg-gray-50">
    <template #title>{{ $t('home.forWhom') }}</template>
    <div class="space-y-4">
      <p
        v-for="(text, index) in forWhomItems"
        :key="index"
        class="text-lg text-gray-700 leading-relaxed"
      >
        {{ text }}
      </p>
    </div>
  </CollapsibleSection>
</template>

<script setup lang="ts">
const { getHomeContent } = useHomeContent()
const homeContent = await getHomeContent()
const forWhomItems = homeContent.forWhom
</script>

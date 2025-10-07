<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('home.forWhom') }}</h2>
        <div class="space-y-4">
          <p
            v-for="(text, index) in forWhomItems"
            :key="index"
            class="text-lg text-gray-700 leading-relaxed"
          >
            {{ text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getHomeContent } = useHomeContent()
const homeContent = await getHomeContent()
const forWhomItems = homeContent.forWhom
</script>

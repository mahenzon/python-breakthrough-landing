<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('home.whatYouLearn') }}</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div
            v-for="(item, index) in whatYouLearnItems"
            :key="index"
            class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
          >
            <span class="text-primary-600 font-bold text-xl flex-shrink-0">✓</span>
            <span class="text-lg text-gray-800">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getHomeContent } = useHomeContent()
const homeContent = await getHomeContent()
const whatYouLearnItems = homeContent.whatYouLearn
</script>

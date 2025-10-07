<template>
  <div class="max-w-6xl mx-auto mb-16">
    <h2 class="text-3xl font-bold mb-12 text-center">{{ $t('courseLinks.valueTitle') }}</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(item, index) in valuePropositionList"
        :key="index"
        class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition"
      >
        <div class="text-4xl mb-4">{{ item.icon }}</div>
        <h3 class="font-bold text-xl mb-3 text-primary-600">{{ item.title }}</h3>
        <p class="text-gray-700">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

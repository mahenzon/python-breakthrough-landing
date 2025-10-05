<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('course.modules') }}</h1>
    
    <div class="grid md:grid-cols-2 gap-8">
      <div 
        v-for="module in course.modules" 
        :key="module.id"
        class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
      >
        <h2 class="text-2xl font-bold mb-4">{{ module.name }}</h2>
        <div class="text-gray-600 mb-4 line-clamp-3">
          {{ getPlainText(module.description) }}
        </div>
        <div class="flex gap-4 text-sm text-gray-500 mb-4">
          <span>{{ module.topics.length }} {{ $t('course.topics') }}</span>
          <span>{{ countModuleLessons(module) }} {{ $t('course.lessons') }}</span>
          <span>{{ calculateModuleDuration(module) }} {{ $t('course.minutes') }}</span>
        </div>
        <NuxtLink 
          :to="`/modules/${module.id}`"
          class="inline-block px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        >
          Подробнее →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module } from '~/types/course';

const { getCourseData } = useCourseData();
const course = getCourseData();

function getPlainText(markdown: string): string {
  return markdown.replace(/[#*`]/g, '').substring(0, 150) + '...';
}

function countModuleLessons(module: Module): number {
  return module.topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
}

function calculateModuleDuration(module: Module): number {
  let total = 0;
  module.topics.forEach(topic => {
    topic.lessons.forEach(lesson => {
      total += lesson.duration_minutes;
    });
  });
  return total;
}

useHead({
  title: 'Модули курса - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Все модули курса Python Breakthrough' },
    { property: 'og:title', content: 'Модули курса' },
    { property: 'og:description', content: 'Все модули курса Python Breakthrough' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>

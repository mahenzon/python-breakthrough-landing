<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="module" class="max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="mb-8 text-sm">
        <NuxtLink to="/modules" class="text-primary-600 hover:text-primary-700">
          ← {{ $t('course.modules') }}
        </NuxtLink>
      </nav>

      <!-- Module Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ module.name }}</h1>
        <div v-if="module.description" class="text-gray-600 mb-4">
          {{ module.description }}
        </div>
        <div class="flex gap-6 text-sm text-gray-500">
          <span>{{ module.topics.length }} {{ $t('course.topics') }}</span>
          <span>{{ totalLessons }} {{ $t('course.lessons') }}</span>
          <span>{{ totalDuration }} {{ $t('course.minutes') }}</span>
        </div>
      </div>

      <!-- Topics List -->
      <div class="space-y-6">
        <div
          v-for="topic in module.topics"
          :key="topic.id"
          class="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 class="text-2xl font-bold mb-3">{{ topic.name }}</h2>
          <div v-if="topic.description" class="text-gray-600 mb-4">
            {{ topic.description }}
          </div>
          
          <!-- Lessons List -->
          <div class="space-y-2">
            <div
              v-for="(lesson, index) in topic.lessons"
              :key="lesson.order"
              class="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
            >
              <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-gray-500 w-8">{{ index + 1 }}.</span>
                <span class="font-medium">{{ lesson.name }}</span>
              </div>
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <span v-if="lesson.duration_minutes > 0">
                  {{ lesson.duration_minutes }} {{ $t('course.minutes') }}
                </span>
                <span v-if="lesson.tasks > 0">
                  {{ lesson.tasks }} {{ $t('course.tasks') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-xl text-gray-600">{{ $t('course.module') }} не найден</p>
      <NuxtLink to="/modules" class="text-primary-600 hover:text-primary-700 mt-4 inline-block">
        ← Вернуться к модулям
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module } from '~/types/course'

const route = useRoute()
const { getModuleById } = useCourseData()

const moduleId = route.params.moduleId as string
const module = await getModuleById(moduleId)

const totalLessons = computed(() => {
  if (!module) return 0
  return module.topics.reduce((sum, topic) => sum + topic.lessons.length, 0)
})

const totalDuration = computed(() => {
  if (!module) return 0
  return module.topics.reduce((sum, topic) =>
    sum + topic.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.duration_minutes, 0),
  0)
})

useHead({
  title: module ? `${module.name} - Python Breakthrough` : 'Модуль не найден',
  meta: [
    { name: 'description', content: module?.description || 'Модуль курса Python Breakthrough' },
    { property: 'og:title', content: module?.name || 'Модуль' },
    { property: 'og:description', content: module?.description || 'Модуль курса' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

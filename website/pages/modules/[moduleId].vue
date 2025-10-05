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
        <div v-if="module.description" class="prose text-gray-600 mb-4" v-html="moduleDescriptionHtml"></div>
        <div class="flex flex-wrap gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <span><strong>{{ $t('course.topicsCount') }}:</strong> {{ module.topics.length }}</span>
          <span><strong>{{ $t('course.lessonsCount') }}:</strong> {{ totalLessons }}</span>
          <span><strong>{{ $t('course.totalVideo') }}</strong> {{ formatDuration(totalDuration) }}</span>
          <span><strong>{{ $t('course.tasksCount') }}:</strong> {{ totalTasks }}</span>
        </div>
      </div>

      <!-- Topics Accordion -->
      <div class="space-y-4">
        <!-- Expand/Collapse All Button -->
        <div class="flex justify-end">
          <button 
            class="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            @click="toggleAllTopics()"
          >
            {{ allTopicsExpanded ? $t('accordion.collapseAll') : $t('accordion.expandAll') }}
          </button>
        </div>

        <div
          v-for="(topic, topicIndex) in module.topics"
          :key="topic.id"
          class="bg-white rounded-lg shadow"
        >
          <!-- Topic Header (Accordion Button) -->
          <button
            class="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
            @click="toggleTopic(topicIndex)"
          >
            <div class="flex-1">
              <h2 class="text-xl font-bold mb-2">
                {{ topicIndex + 1 }}. {{ topic.name }}
              </h2>
              <div class="flex flex-wrap gap-3 text-sm text-gray-500">
                <span>{{ $t('course.lessonsCount') }}: {{ topic.lessons.length }}</span>
                <span>{{ $t('course.totalVideo') }} {{ getTopicDuration(topic) }}</span>
                <span v-if="getTopicTasks(topic) > 0">{{ $t('course.tasksCount') }}: {{ getTopicTasks(topic) }}</span>
              </div>
            </div>
            <span class="transform transition-transform ml-4" :class="{ 'rotate-180': openTopics[topicIndex] }">
              ▼
            </span>
          </button>
          
          <!-- Topic Content (Collapsible) -->
          <div v-show="openTopics[topicIndex]" class="px-6 pb-6">
            <div v-if="topic.description" class="text-gray-600 mb-4">
              {{ topic.description }}
            </div>
            
            <!-- Lessons Header -->
            <div class="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-medium text-gray-500 border-b">
              <div class="col-span-7">Урок</div>
              <div class="col-span-3 text-center">{{ $t('course.videoDuration') }}</div>
              <div class="col-span-2 text-center">{{ $t('course.tasks') }}</div>
            </div>
            
            <!-- Lessons List -->
            <div class="space-y-1 mt-2">
              <div
                v-for="(lesson, index) in topic.lessons"
                :key="lesson.order"
                class="grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <div class="col-span-7 flex items-center gap-2">
                  <span class="text-sm font-medium text-gray-400 min-w-[2rem]">{{ index + 1 }}.</span>
                  <span class="font-medium">{{ lesson.name }}</span>
                </div>
                <div class="col-span-3 text-center text-sm text-gray-600">
                  <span v-if="lesson.duration_minutes && lesson.duration_minutes > 0">
                    {{ lesson.duration_minutes }} {{ $t('course.minutes') }}
                  </span>
                  <span v-else class="text-gray-400">—</span>
                </div>
                <div class="col-span-2 text-center text-sm text-gray-600">
                  <span v-if="lesson.tasks && lesson.tasks > 0">{{ lesson.tasks }}</span>
                  <span v-else class="text-gray-400">—</span>
                </div>
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
import { marked } from 'marked'
import type { Topic } from '~/types/course'

const route = useRoute()
const { getModuleById } = useCourseData()
const { t } = useI18n()

const moduleId = route.params.moduleId as string
const module = await getModuleById(moduleId)

const openTopics = ref<Record<number, boolean>>({})
const allTopicsExpanded = computed(() => {
  if (!module) return false
  return module.topics.every((_, index) => openTopics.value[index] === true)
})

function toggleTopic(index: number) {
  openTopics.value[index] = !openTopics.value[index]
}

function toggleAllTopics() {
  if (!module) return
  const shouldExpand = !allTopicsExpanded.value
  module.topics.forEach((_, index) => {
    openTopics.value[index] = shouldExpand
  })
}

const moduleDescriptionHtml = computed(() => {
  if (!module || !module.description) return ''
  return marked(module.description)
})

const totalLessons = computed(() => {
  if (!module) return 0
  return module.topics.reduce((sum, topic) => sum + topic.lessons.length, 0)
})

const totalDuration = computed(() => {
  if (!module) return 0
  return module.topics.reduce((sum, topic) =>
    sum + topic.lessons.reduce((lessonSum, lesson) => lessonSum + (lesson.duration_minutes || 0), 0),
  0)
})

const totalTasks = computed(() => {
  if (!module) return 0
  return module.topics.reduce((sum, topic) =>
    sum + topic.lessons.reduce((lessonSum, lesson) => lessonSum + (lesson.tasks || 0), 0),
  0)
})

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0 && mins > 0) {
    return `${hours} ${t('course.hours')} ${mins} ${t('course.minutes')}`
  }
  if (hours > 0) {
    return `${hours} ${t('course.hours')}`
  }
  return `${mins} ${t('course.minutes')}`
}

function getTopicDuration(topic: Topic): string {
  const duration = topic.lessons.reduce((sum, lesson) => sum + (lesson.duration_minutes || 0), 0)
  return formatDuration(duration)
}

function getTopicTasks(topic: Topic): number {
  return topic.lessons.reduce((sum, lesson) => sum + (lesson.tasks || 0), 0)
}

useHead({
  title: module ? `${module.name} - ${t('brand.name')}` : 'Модуль не найден',
  meta: [
    { name: 'description', content: module?.description || `Модуль курса ${t('brand.name')}` },
    { property: 'og:title', content: module?.name || 'Модуль' },
    { property: 'og:description', content: module?.description || 'Модуль курса' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

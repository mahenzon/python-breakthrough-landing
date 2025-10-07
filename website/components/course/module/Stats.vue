<template>
  <div class="flex flex-wrap gap-3 text-md text-gray-600 mb-4">
    <span>{{ $t('course.topicsCount') }}: {{ module.topics.length }}</span>
    <span>{{ $t('course.lessonsCount') }}: {{ countModuleLessons(module) }}</span>
    <span v-if="totalModuleMinutes(module)">{{ $t('course.totalVideo') }} {{ formatDuration(module) }}</span>
    <span>{{ $t('course.tasksCount') }}: {{ countModuleTasks(module) }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Module } from '~/types/course'

defineProps<{
  module: Module
}>()

function totalModuleMinutes(module: Module): number {
  let totalMinutes = 0
  module.topics.forEach((topic) => {
    topic.lessons.forEach((lesson) => {
      totalMinutes += lesson.duration_minutes || 0
    })
  })
  return totalMinutes
}

function formatDuration(module: Module): string {
  const totalMinutes = totalModuleMinutes(module)

  if (totalMinutes === 0)
    return '—'

  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60

  if (hours > 0) {
    return mins > 0 ? `${hours} ч ${mins} м` : `${hours} ч`
  }
  return `${mins} м`
}

function countModuleTasks(module: Module): number {
  let total = 0
  module.topics.forEach((topic) => {
    topic.lessons.forEach((lesson) => {
      total += lesson.tasks || 0
    })
  })
  return total
}

function countModuleLessons(module: Module): number {
  return module.topics.reduce((sum, topic) => sum + topic.lessons.length, 0)
}

</script>

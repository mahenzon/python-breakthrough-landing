<template>
  <div class="bg-white rounded-lg shadow-lg p-6" :class="borderClass">
    <h3 class="text-xl font-bold mb-3">{{ project.title }}</h3>
    <p class="text-gray-600 mb-4">{{ project.description }}</p>

    <div v-if="'author' in project" class="text-sm text-gray-500 mb-4">
      {{ $t('projects.authorLabel') }}: {{ project.author }}
    </div>

    <a
      v-if="showViewButton && project.url"
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
    >
      {{ $t('projects.viewProject') }} →
    </a>

    <div
      v-else-if="!showViewButton"
      class="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded"
    >
      {{ $t('projects.comingSoon') }}
    </div>
  </div>
</template>

<script setup lang="ts">

import type { CourseProject, StudentProject } from '~/types/content'

interface Props {
  project: CourseProject | StudentProject
  showBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBorder: false,
})

const showViewButton = computed<boolean>(() => {
  return !!props.project.url && (
    !('status' in props.project) || props.project.status === 'available'
  )
})

const borderClass = computed(() => {
  return props.showBorder ? 'border-2 border-primary-200' : ''
})
</script>

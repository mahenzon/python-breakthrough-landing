<template>
  <section>
    <h2 class="text-3xl font-bold mb-4">{{ title }}</h2>
    <p class="text-gray-600 mb-8">{{ description }}</p>

    <div v-if="projects.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
        :show-border="showBorder"
      />
    </div>

    <div v-else class="text-center text-gray-600 py-12 bg-white rounded-lg shadow">
      <p class="text-xl">{{ $t('projects.noProjects') }}</p>
    </div>

  </section>
</template>

<script setup lang="ts">
import type { CourseProject, StudentProject } from '~/types/content'


interface Props {
  title: string
  description: string
  projects: (CourseProject | StudentProject)[]
  showBorder?: boolean
}

withDefaults(defineProps<Props>(), {
  showBorder: false,
})
</script>

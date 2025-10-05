<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('projects.title') }}</h1>
    
    <div v-if="projects.length === 0" class="text-center text-gray-600 py-12 bg-white rounded-lg shadow">
      <p class="text-xl">{{ $t('projects.noProjects') }}</p>
    </div>
    
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in projects" 
        :key="project.order"
        class="bg-white rounded-lg shadow-lg p-6"
      >
        <h3 class="text-xl font-bold mb-3">{{ project.title }}</h3>
        <p class="text-gray-600 mb-4">{{ project.description }}</p>
        <div v-if="project.author" class="text-sm text-gray-500 mb-4">
          Автор: {{ project.author }}
        </div>
        <a 
          :href="project.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        >
          {{ $t('projects.viewProject') }} →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getProjects } = useProjectsData()
const projects = await getProjects()

useHead({
  title: 'Проекты студентов - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Проекты, созданные студентами курса Python Breakthrough' },
    { property: 'og:title', content: 'Проекты студентов' },
    { property: 'og:description', content: 'Проекты, созданные студентами курса' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

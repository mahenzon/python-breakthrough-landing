<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6">{{ config.course.title }}</h1>
          <p class="text-xl text-gray-600 mb-8">{{ config.course.subtitle }}</p>
          
          <div class="prose prose-lg max-w-none mx-auto mb-8">
            <p class="whitespace-pre-line">{{ config.course.description }}</p>
          </div>
          
          <div class="flex justify-center gap-4 flex-wrap mb-12">
            <NuxtLink to="/modules" class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
              {{ $t('nav.modules') }}
            </NuxtLink>
            <NuxtLink to="/collaboration" class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition">
              {{ $t('nav.collaboration') }}
            </NuxtLink>
          </div>
        </div>
        
        <!-- Author Info -->
        <div class="mt-16 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-4 text-center">{{ config.author.name }}</h2>
          <p class="text-gray-700 whitespace-pre-line mb-6">{{ config.author.bio }}</p>
          
          <div class="flex justify-center gap-4 flex-wrap">
            <a 
              v-for="link in config.author.links" 
              :key="link.name"
              :href="link.url" 
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Statistics Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">{{ $t('stats.title') }}</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.totalLessons }}</div>
            <div class="text-gray-600 text-sm">{{ $t('stats.totalLessons') }}</div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.totalDurationFormatted }}</div>
            <div class="text-gray-600 text-sm">{{ $t('stats.totalDuration') }}</div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.numberOfStudents }}</div>
            <div class="text-gray-600 text-sm">{{ $t('stats.students') }}</div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.modulesCount }}</div>
            <div class="text-gray-600 text-sm">{{ $t('stats.modules') }}</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 bg-primary-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ $t('cta.ready') }}</h2>
        <p class="text-xl text-gray-600 mb-8">{{ $t('cta.explore') }}</p>
        <div class="flex justify-center gap-4 flex-wrap">
          <NuxtLink to="/faq" class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-100 transition">
            {{ $t('nav.faq') }}
          </NuxtLink>
          <NuxtLink to="/projects" class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-100 transition">
            {{ $t('nav.projects') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { getStatistics } = useCourseData()
const { getConfig } = useConfig()

const config = await getConfig()
const stats = await getStatistics(config.statistics.numberOfStudents)

useHead({
  title: config.course.title,
  meta: [
    { name: 'description', content: config.course.subtitle },
    { property: 'og:title', content: config.course.title },
    { property: 'og:description', content: config.course.subtitle },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

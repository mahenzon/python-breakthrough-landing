<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('stats.title') }}</h1>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-5xl font-bold text-primary-600 mb-2">{{ stats.totalLessons }}</div>
        <div class="text-gray-600">{{ $t('stats.totalLessons') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-5xl font-bold text-primary-600 mb-2">{{ stats.totalDurationFormatted }}</div>
        <div class="text-gray-600">{{ $t('stats.totalVideosDuration') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-5xl font-bold text-primary-600 mb-2">{{ stats.numberOfStudents }}</div>
        <div class="text-gray-600">{{ $t('stats.students') }}</div>
      </div>
    </div>
    
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.modulesCount }}</div>
        <div class="text-gray-600">{{ $t('stats.modules') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.topicsCount }}</div>
        <div class="text-gray-600">{{ $t('stats.topics') }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.totalTasks }}</div>
        <div class="text-gray-600">{{ $t('stats.tasks') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getStatistics } = useCourseData()

const stats = await getStatistics()
const { t } = useI18n()

useHead({
  title: `Статистика курса - ${t('brand.name')}`,
  meta: [
    { name: 'description', content: `Курс содержит ${stats.totalLessons} уроков общей длительностью ${stats.totalDurationFormatted}` },
    { property: 'og:title', content: 'Статистика курса' },
    { property: 'og:description', content: `${stats.totalLessons} уроков, ${stats.totalDurationFormatted}` },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

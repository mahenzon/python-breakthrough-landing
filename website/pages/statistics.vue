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
        <div class="text-gray-600">{{ pluralLabels.students }}</div>
      </div>
    </div>
    
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.modulesCount }}</div>
        <div class="text-gray-600">{{ pluralLabels.modules }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.topicsCount }}</div>
        <div class="text-gray-600">{{ pluralLabels.topics }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.totalTasks }}</div>
        <div class="text-gray-600">{{ pluralLabels.tasks }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPluralForm, type PluralForms } from '~/utils/pluralize'

const { getStatistics } = useCourseData()

const stats = await getStatistics()
const { t, tm } = useI18n()

const modulesForms = tm('stats.modulesForms') as PluralForms
const topicsForms = tm('stats.topicsForms') as PluralForms
const tasksForms = tm('stats.tasksForms') as PluralForms
const studentsForms = tm('stats.studentsForms') as PluralForms

const pluralLabels = {
  modules: getPluralForm(stats.modulesCount, modulesForms),
  topics: getPluralForm(stats.topicsCount, topicsForms),
  tasks: getPluralForm(stats.totalTasks, tasksForms),
  students: getPluralForm(stats.numberOfStudents, studentsForms),
}

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

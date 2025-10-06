<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-center mb-12">{{ $t('stats.title') }}</h1>
    
    <SectionsStatsSection 
      :stats="stats"
      :course-projects-count="courseProjectsCount"
      :student-projects-count="studentProjectsCount"
    />
  </div>
</template>

<script setup lang="ts">
const { getStatistics } = useCourseData()
const { getStudentProjects, getCourseProjects } = useProjectsData()

const stats = await getStatistics()
const studentProjects = await getStudentProjects()
const courseProjects = await getCourseProjects()
const { t } = useI18n()

// Count projects
const courseProjectsCount = courseProjects.length
const studentProjectsCount = studentProjects.length

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

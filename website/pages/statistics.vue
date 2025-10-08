<template>
  <div class="container mx-auto px-4 py-12">
    <CourseStatistics />
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

<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('stats.title') }}</h1>
    
    <!-- Main Statistics -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <UiStatsCard 
        :value="stats.totalLessons"
        :label="$t('stats.totalLessons')"
        value-color="text-primary-600"
      />
      
      <UiStatsCard 
        :value="stats.totalDurationFormatted"
        :label="$t('stats.totalVideosDuration')"
        value-color="text-primary-600"
      />
      
      <UiStatsCard 
        :value="stats.numberOfStudents"
        :label="$t('stats.studentsPlural', stats.numberOfStudents)"
        value-color="text-primary-600"
      />
    </div>
    
    <!-- Detailed Statistics -->
    <div class="grid md:grid-cols-3 gap-6">
      <UiStatsCard 
        :value="stats.modulesCount"
        :label="$t('stats.modules', stats.modulesCount)"
        value-color="text-primary-600"
      />
      
      <UiStatsCard 
        :value="stats.topicsCount"
        :label="$t('stats.topics', stats.topicsCount)"
        value-color="text-primary-600"
      />
      
      <UiStatsCard 
        :value="stats.totalTasks"
        :label="$t('stats.tasks', stats.totalTasks)"
        value-color="text-primary-600"
      />
    </div>

    <!-- Divider -->
    <div class="max-w-2xl mx-auto my-8">
      <div class="border-t-2 border-dashed border-gray-300"></div>
    </div>

    <!-- Projects Statistics -->
    <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <UiStatsCard 
        :value="courseProjectsCount"
        :label="$t('stats.courseProjects')"
        value-color="text-primary-600"
        to="/projects"
      />
      
      <UiStatsCard 
        :value="studentProjectsCount"
        :label="$t('stats.studentProjects')"
        value-color="text-primary-600"
        to="/projects"
      />
    </div>
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

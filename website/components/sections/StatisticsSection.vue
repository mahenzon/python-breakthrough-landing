<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="mb-10">
        <h2 class="text-3xl font-bold text-center mb-3">{{ $t('stats.title') }}</h2>
        <h3 class="text-2xl text-center">{{ $t('stats.subtitle') }}</h3>
      </div>
      <SectionsStatsSection
        :stats="stats"
        :course-projects-count="courseProjectsCount"
        :student-projects-count="studentProjectsCount"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const { getStatistics } = useCourseData()
const { getStudentProjects, getCourseProjects } = useProjectsData()

const stats = await getStatistics()
const studentProjects = await getStudentProjects()
const courseProjects = await getCourseProjects()

const courseProjectsCount = courseProjects.length
const studentProjectsCount = studentProjects.length
</script>

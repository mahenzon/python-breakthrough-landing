<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">{{ $t('stats.title') }}</h2>

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

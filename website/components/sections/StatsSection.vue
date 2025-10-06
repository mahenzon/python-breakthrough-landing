<template>
  <div>
    <!-- Main Statistics -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
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
        :value="stats.totalLessons"
        :label="$t('stats.lessonsPlural', stats.totalLessons)"
        value-color="text-primary-600"
      />

      <UiStatsCard 
        :value="stats.totalTasks"
        :label="$t('stats.tasks', stats.totalTasks)"
        value-color="text-primary-600"
      />

      <UiStatsCard 
        :value="stats.numberOfStudents"
        :label="$t('stats.studentsPlural', stats.numberOfStudents)"
        value-color="text-primary-600"
      />
    </div>

    <!-- Divider -->
    <div class="max-w-4xl mx-auto my-8">
      <div class="border-t-2 border-dashed border-gray-300"></div>
    </div>

    <!-- Additional Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <UiStatsCard 
        :value="stats.totalDurationFormatted"
        :label="$t('stats.totalVideosDuration')"
        value-color="text-primary-600"
      />

      <UiStatsCard 
        :value="courseProjectsCount"
        :label="`${$t('stats.projects', courseProjectsCount)} ${$t('stats.onCourse')}`"
        value-color="text-primary-600"
        to="/projects"
      />

      <UiStatsCard 
        :value="studentProjectsCount"
        :label="`${$t('stats.projects', studentProjectsCount)} ${$t('stats.ofStudents')}`"
        value-color="text-primary-600"
        to="/projects"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CourseStatistics } from '~/types/course'

defineProps<{
  stats: CourseStatistics
  courseProjectsCount: number
  studentProjectsCount: number
}>()

</script>

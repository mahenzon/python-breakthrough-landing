<template>
  <div>
    <!-- Main Statistics -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
      <UiStatsCard
        v-for="(stat, index) in mainStatistics"
        :key="index"
        :value="stat.value"
        :label="stat.label"
        :to="stat.to"
      />
    </div>

    <!-- Divider -->
    <div class="max-w-4xl mx-auto my-8">
      <div class="border-t-2 border-dashed border-gray-300"></div>
    </div>

    <!-- Additional Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <UiStatsCard
        v-for="(stat, index) in additionalStatistics"
        :key="index"
        :value="stat.value"
        :label="stat.label"
        :to="stat.to"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CourseStatistics } from '~/types/course'

interface StatItem {
  value: string | number
  label: string
  to?: string
}

const props = defineProps<{
  stats: CourseStatistics
  courseProjectsCount: number
  studentProjectsCount: number
}>()

const { t } = useI18n()

const mainStatistics: StatItem[] = [
  {
    value: props.stats.modulesCount,
    label: t('stats.modules', props.stats.modulesCount),
  },
  {
    value: props.stats.topicsCount,
    label: t('stats.topics', props.stats.topicsCount),
  },
  {
    value: props.stats.totalLessons,
    label: t('stats.lessonsPlural', props.stats.totalLessons),
  },
  {
    value: props.stats.totalTasks,
    label: t('stats.tasks', props.stats.totalTasks),
  },
  {
    value: props.stats.numberOfStudents,
    label: t('stats.studentsPlural', props.stats.numberOfStudents),
  },
]

const additionalStatistics: StatItem[] = [
  {
    value: props.stats.totalDurationFormatted,
    label: t('stats.totalVideosDuration'),
  },
  {
    value: props.courseProjectsCount,
    label: `${t('stats.projects', props.courseProjectsCount)} ${t('stats.onCourse')}`,
    to: '/projects',
  },
  {
    value: props.studentProjectsCount,
    label: `${t('stats.projects', props.studentProjectsCount)} ${t('stats.ofStudents')}`,
    to: '/projects#students-projects',
  },
]

</script>

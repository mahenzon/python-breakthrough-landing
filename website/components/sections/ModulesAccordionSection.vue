<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('course.modules') }}</h2>

        <div class="flex justify-end mb-4">
          <button
            class="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            @click="toggleAllModules()"
          >
            {{ allModulesExpanded ? $t('accordion.collapseAll') : $t('accordion.expandAll') }}
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(module, moduleIndex) in course.modules"
            :key="module.id"
            class="bg-white rounded-lg shadow"
          >
            <div class="p-6 border-b cursor-pointer hover:bg-gray-50 transition" @click="toggleModule(moduleIndex)">
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2">{{ module.name }}</h3>

                  <div class="mb-3">
                    <CourseModuleTechIcons
                      :module-id="module.id"
                      layout="horizontal"
                      icon-size="sm"
                    />
                  </div>

                  <CourseModuleStats :module="module" />
                </div>
                <div class="flex gap-2 items-center">
                  <div class="p-2">
                    <span class="transform transition-transform inline-block text-gray-600" :class="{ 'rotate-180': openModules[moduleIndex] }">
                      ▼
                    </span>
                  </div>
                  <NuxtLink
                    :to="`/modules/${module.id}`"
                    class="px-4 py-2 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                    @click.stop
                  >
                    Подробнее
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div v-show="openModules[moduleIndex]" class="p-6">
              <div class="space-y-3">
                <div
                  v-for="(topic, topicIndex) in module.topics"
                  :key="topic.id"
                  class="border-l-4 border-primary-200 pl-4 py-2"
                >
                  <div class="font-semibold mb-1">{{ topicIndex + 1 }}. {{ topic.name }}</div>
                  <div class="text-sm text-gray-600 mb-2">
                    <span>{{ $t('course.lessonsCount') }}: {{ topic.lessons.length }}</span>
                    <span v-if="getTopicDurationMinutes(topic) > 0"> • {{ getTopicDuration(topic) }}</span>
                  </div>
                  <div class="pl-4 space-y-1">
                    <div
                      v-for="(lesson, lessonIndex) in topic.lessons"
                      :key="lesson.order"
                      class="text-sm text-gray-500"
                    >
                      {{ lessonIndex + 1 }}. {{ lesson.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Topic } from '~/types/course'

const { getCourseData } = useCourseData()
const course = await getCourseData()

const openModules = ref<boolean[]>(new Array(course.modules.length).fill(false))
const allModulesExpanded = computed(() => openModules.value.every(v => v))

function toggleModule(index: number) {
  openModules.value[index] = !openModules.value[index]
}

function toggleAllModules() {
  const shouldExpand = !allModulesExpanded.value
  openModules.value = new Array(course.modules.length).fill(shouldExpand)
}

function formatDuration(minutes: number | undefined): string {
  if (!minutes)
    return '—'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return mins > 0 ? `${hours} ч ${mins} м` : `${hours} ч`
  }
  return `${mins} м`
}

function getTopicDurationMinutes(topic: Topic): number {
  return topic.lessons.reduce((sum, lesson) => sum + (lesson.duration_minutes || 0), 0)
}

function getTopicDuration(topic: Topic): string {
  const totalMinutes = getTopicDurationMinutes(topic)
  return formatDuration(totalMinutes)
}
</script>

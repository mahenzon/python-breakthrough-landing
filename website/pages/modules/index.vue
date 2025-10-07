<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('course.modules') }}</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <div
        v-for="module in course.modules"
        :key="module.id"
        class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
      >
        <h2 class="text-3xl font-bold mb-4">{{ module.name }}</h2>

        <!-- Tech Icons (Horizontal) -->
        <div class="mb-4">
          <CourseModuleTechIcons
            :module-id="module.id"
            layout="horizontal"
            icon-size="md"
          />
        </div>

        <div class="text-gray-700 text-lg mb-4 line-clamp-3">
          {{ getPlainText(module.description) }}
        </div>

        <CourseModuleStats :module="module" />

        <NuxtLink
          :to="`/modules/${module.id}`"
          class="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        >
          Подробнее →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getCourseData } = useCourseData()
const { t } = useI18n()
const course = await getCourseData()

function getPlainText(markdown: string): string {
  const value = markdown.replace(/[#*`]/g, '')
  if (value.length < 150) {
    return value
  }
  return value.substring(0, 150).trim() + '...'
}

useHead({
  title: `Модули курса - ${t('brand.name')}`,
  meta: [
    { name: 'description', content: `Все модули курса ${t('brand.name')}` },
    { property: 'og:title', content: 'Модули курса' },
    { property: 'og:description', content: `Все модули курса ${t('brand.name')}` },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

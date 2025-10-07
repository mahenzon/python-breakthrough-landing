<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-4 text-center">{{ $t('courseLinks.title') }}</h1>
    <p class="text-center text-gray-600 mb-12 text-lg">{{ $t('courseLinks.description') }}</p>

    <!-- Course Platforms -->
    <div class="max-w-5xl mx-auto mb-16">
      <div class="grid md:grid-cols-2 gap-8">
        <CourseCard
          v-for="platform in platforms"
          :key="platform.id"
          :platform="platform"
        />
      </div>
    </div>

    <!-- Value Proposition -->
    <SectionsValuePropositionSection />

    <!-- Payment by Invoice -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-gradient-to-br from-primary-50 to-white rounded-lg shadow-lg p-12 text-center">
        <div class="text-5xl mb-4">🏢</div>
        <h2 class="text-3xl font-bold mb-6">{{ $t('courseLinks.invoiceTitle') }}</h2>
        <p class="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">{{ $t('courseLinks.invoiceDescription') }}</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/contacts"
            class="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-lg"
          >
            {{ $t('courseLinks.contactsTitle') }} →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { getCourseLinksData } = useCourseLinksData()
const courseLinksData = await getCourseLinksData()
const platforms = courseLinksData.platforms.sort((a, b) => a.order - b.order)

useHead({
  title: `${t('courseLinks.title')} - ${t('brand.name')}`,
  meta: [
    { name: 'description', content: t('courseLinks.description') },
    { property: 'og:title', content: t('courseLinks.title') },
    { property: 'og:description', content: t('courseLinks.description') },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

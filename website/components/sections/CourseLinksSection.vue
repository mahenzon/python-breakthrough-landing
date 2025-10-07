<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold mb-4 text-center">{{ $t('courseLinks.title') }}</h2>
        <p class="text-center text-gray-600 mb-12 text-lg">{{ $t('courseLinks.description') }}</p>

        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <CourseCourseCard
            v-for="platform in platforms"
            :key="platform.id"
            :platform="platform"
          />
        </div>

        <SectionsValuePropositionSection />

        <div class="bg-gradient-to-br from-primary-50 to-white rounded-lg shadow-lg p-12 text-center">
          <div class="text-5xl mb-4">🏢</div>
          <h3 class="text-3xl font-bold mb-6">{{ $t('courseLinks.invoiceTitle') }}</h3>
          <p class="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">{{ $t('courseLinks.invoiceDescription') }}</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/contacts" class="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-lg">
              {{ $t('courseLinks.contactsTitle') }} →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getCourseLinksData } = useCourseLinksData()
const courseLinksData = await getCourseLinksData()
const platforms = courseLinksData.platforms.sort((a, b) => a.order - b.order)
</script>

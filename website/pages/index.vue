<template>
  <div>
    <SectionsHeroSection />
    <SectionsAuthorSection />
    <SectionsTechnologyStackSection
      v-if="technologyStackData.categories.length"
      :data="technologyStackData"
    />
    <SectionsStatisticsSection />
    <SectionsWhatYouLearnSection />
    <SectionsModulesAccordionSection />
    <SectionsUnderDevelopmentSection />
    <SectionsForWhomSection />
    <SectionsRequirementsSection />
    <SectionsHowItWorksSection />
    <SectionsWhatYouGetSection />
    <SectionsCourseLinksSection />
    <SectionsCTASection />
  </div>
</template>

<script setup lang="ts">
const { getTechnologyStackData } = useTechnologyStackData()
const { getConfig } = useConfig()
const { getStatistics } = useCourseData()
const { t } = useI18n()

const config = await getConfig()
const stats = await getStatistics()
const technologyStackData = await getTechnologyStackData()

useHead({
  title: `${config.og.title}`,
  meta: [
    { name: 'description', content: `${config.og.description}` },
    { property: 'og:title', content: config.og.title },
    { property: 'og:description', content: config.og.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/img/python-breakthrough-min.jpeg' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: config.course.title,
        description: `${config.course.subtitle}. ${t('home.shortDescription')}`,
        provider: {
          '@type': 'Person',
          name: config.author.name,
        },
        educationalLevel: 'Beginner to Intermediate',
        inLanguage: 'ru',
        numberOfLessons: stats.totalLessons,
        timeRequired: `PT${stats.totalDurationMinutes}M`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          ratingCount: stats.numberOfStudents,
        },
      }),
    },
  ],
})
</script>

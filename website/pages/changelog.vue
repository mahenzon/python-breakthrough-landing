<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-5xl mx-auto">
      <article class="prose prose-lg max-w-none bg-white rounded-lg shadow-lg p-8">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="renderedContent"></div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const { getLatestChanges } = useLatestChanges()
const content = await getLatestChanges()
const rawHtml = await marked(content)

// Wrap each table in a scrollable container
const renderedContent = rawHtml.replace(
  /<table>/g,
  '<div class="overflow-x-auto"><table>',
).replace(
  /<\/table>/g,
  '</table></div>',
)

const { t } = useI18n()

useHead({
  title: `${t('changelog.title')} - ${t('brand.name')}`,
  meta: [
    { name: 'description', content: t('changelog.title') },
    { property: 'og:title', content: t('changelog.title') },
    { property: 'og:description', content: t('changelog.title') },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<style scoped>
:deep(.prose table tbody tr:nth-child(even)) {
  background-color: rgba(15, 23, 42, 0.04);
}

:deep(.dark .prose table tbody tr:nth-child(even)) {
  background-color: rgba(255, 255, 255, 0.08);
}
</style>

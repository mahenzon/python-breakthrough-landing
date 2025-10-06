<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-5xl mx-auto">
      <article class="prose prose-lg max-w-none bg-white rounded-lg shadow-lg p-8">
        <div v-html="renderedContent"></div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const { getLatestChanges } = useLatestChanges()
const content = await getLatestChanges()
const renderedContent = marked(content)

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

<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ $t('latest.title') }}</h1>
    
    <div class="max-w-3xl mx-auto">
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
  title: 'Последние обновления - ${t('brand.name')}',
  meta: [
    { name: 'description', content: 'Последние изменения и обновления курса' },
    { property: 'og:title', content: 'Последние обновления' },
    { property: 'og:description', content: 'Последние изменения и обновления курса' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">{{ $t('collaboration.title') }}</h1>
      
      <div class="prose prose-lg max-w-none bg-white rounded-lg shadow-lg p-8">
        <h2>Корпоративное обучение</h2>
        <p>
          Предлагаю услуги по обучению сотрудников вашей компании веб-разработке на Python.
          Возможны индивидуальные и групповые консультации.
        </p>
        
        <h2>Что включено:</h2>
        <ul>
          <li>Групповые занятия для команды</li>
          <li>Индивидуальные консультации</li>
          <li>Ревью кода и архитектуры</li>
          <li>Адаптация программы под ваши задачи</li>
        </ul>
        
        <h2>Для юридических лиц:</h2>
        <p>
          Работаю с организациями по договору. Предоставляю все необходимые документы.
        </p>
        
        <h2>Связаться:</h2>
        <div class="flex gap-4 flex-wrap not-prose">
          <a 
            v-for="link in config.author.links" 
            :key="link.name"
            :href="link.url" 
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getSiteConfig } = useSiteConfig()
const config = getSiteConfig()

useHead({
  title: 'Сотрудничество - Python Breakthrough',
  meta: [
    { name: 'description', content: 'Корпоративное обучение и консультации по веб-разработке на Python' },
    { property: 'og:title', content: 'Сотрудничество' },
    { property: 'og:description', content: 'Корпоративное обучение и консультации' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

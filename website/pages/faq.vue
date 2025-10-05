<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-center">{{ $t('faq.title') }}</h1>
    
    <div class="max-w-3xl mx-auto space-y-4">
      <div 
        v-for="(faq, index) in faqs" 
        :key="faq.order"
        class="bg-white rounded-lg shadow"
      >
        <button
          class="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
          @click="toggleFaq(index)"
        >
          <span class="font-medium text-lg">{{ faq.question }}</span>
          <span class="transform transition-transform" :class="{ 'rotate-180': openFaq === index }">
            ▼
          </span>
        </button>
        
        <div v-show="openFaq === index" class="px-6 pb-6">
          <p class="text-gray-700 whitespace-pre-line">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getFaqItems } = useFaqData()
const faqs = await getFaqItems()

const openFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}

const { t } = useI18n()
useHead({
  title: 'FAQ - ${t('brand.name')}',
  meta: [
    { name: 'description', content: 'Часто задаваемые вопросы о курсе ${t('brand.name')}' },
    { property: 'og:title', content: 'Часто задаваемые вопросы' },
    { property: 'og:description', content: 'Ответы на частые вопросы о курсе' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

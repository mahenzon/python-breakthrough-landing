<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 text-center">{{ $t('contacts.title') }}</h1>
      <p class="text-center text-gray-600 mb-12 text-lg">{{ $t('contacts.subtitle') }}</p>
      
      <!-- Contact Methods -->
      <div class="grid md:grid-cols-3 gap-6 mb-16">
        <!-- Email -->
        <a 
          href="mailto:suren@internet.ru"
          class="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition block"
        >
          <div class="text-5xl mb-4">📧</div>
          <h3 class="font-bold text-xl mb-3 text-primary-600">Email</h3>
          <p class="text-gray-700 text-sm mb-4">{{ $t('contacts.emailTitle') }}</p>
          <div class="text-primary-600 font-medium">suren@internet.ru</div>
        </a>
        
        <!-- Telegram -->
        <a 
          href="https://t.me/mahenzon"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition block"
        >
          <div class="text-5xl mb-4">✈️</div>
          <h3 class="font-bold text-xl mb-3 text-primary-600">Telegram</h3>
          <p class="text-gray-700 text-sm mb-4">{{ $t('contacts.socialTitle') }}</p>
          <div class="text-primary-600 font-medium">@mahenzon</div>
        </a>
        
        <!-- VK -->
        <a 
          href="https://vk.com/mahenzon"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition block"
        >
          <div class="text-5xl mb-4">👥</div>
          <h3 class="font-bold text-xl mb-3 text-primary-600">ВКонтакте</h3>
          <p class="text-gray-700 text-sm mb-4">{{ $t('contacts.socialTitle') }}</p>
          <div class="text-primary-600 font-medium">vk.com/mahenzon</div>
        </a>
      </div>
      
      <!-- Corporate Training Section -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div class="text-4xl mb-4 text-center">🏢</div>
        <h2 class="text-3xl font-bold mb-4 text-center">{{ $t('contacts.corporateTitle') }}</h2>
        <p class="text-gray-700 mb-6 text-center text-lg">
          {{ $t('contacts.corporateDescription') }}
        </p>
        
        <h3 class="text-xl font-bold mb-4">{{ $t('contacts.corporateIncludesTitle') }}</h3>
        <ul class="space-y-3 mb-6">
          <li class="flex items-start gap-3">
            <span class="text-primary-600 font-bold text-xl flex-shrink-0">✓</span>
            <span class="text-gray-700">{{ $t('contacts.corporateInclude1') }}</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary-600 font-bold text-xl flex-shrink-0">✓</span>
            <span class="text-gray-700">{{ $t('contacts.corporateInclude2') }}</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary-600 font-bold text-xl flex-shrink-0">✓</span>
            <span class="text-gray-700">{{ $t('contacts.corporateInclude3') }}</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-primary-600 font-bold text-xl flex-shrink-0">✓</span>
            <span class="text-gray-700">{{ $t('contacts.corporateInclude4') }}</span>
          </li>
        </ul>
        
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="font-bold text-lg mb-2">{{ $t('contacts.legalTitle') }}</h3>
          <p class="text-gray-700">{{ $t('contacts.legalDescription') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: `${t('contacts.title')} - ${t('brand.name')}`,
  meta: [
    { name: 'description', content: t('contacts.subtitle') },
    { property: 'og:title', content: t('contacts.title') },
    { property: 'og:description', content: t('contacts.subtitle') },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

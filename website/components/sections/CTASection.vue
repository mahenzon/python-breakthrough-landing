<template>
  <section class="py-16 bg-primary-600 text-white">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold mb-4">{{ $t('cta.ready') }}</h2>
      <p class="text-xl mb-8 opacity-90">{{ $t('cta.explore') }}</p>
      <div class="flex justify-center gap-4 flex-wrap">
        <NuxtLink to="/modules" class="px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-semibold">
          {{ $t('nav.modules') }}
        </NuxtLink>
        <NuxtLink to="/faq" class="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition font-semibold">
          {{ $t('nav.faq') }}
        </NuxtLink>
        <NuxtLink to="/projects" class="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition font-semibold">
          {{ $t('nav.projects') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

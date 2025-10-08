<template>
  <section class="py-8 md:py-20 bg-gradient-to-br from-primary-50 to-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-5xl font-bold mb-6">{{ config.course.title }}</h1>
            <p class="text-xl text-gray-600 mb-6">{{ config.course.subtitle }}</p>
            <p class="text-lg text-gray-700 mb-8">{{ $t('home.shortDescription') }}</p>

            <div class="flex gap-4 flex-wrap">
              <NuxtLink to="/modules" class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold">
                {{ $t('nav.modules') }}
              </NuxtLink>
              <NuxtLink to="/faq" class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold">
                {{ $t('nav.faqMin') }}
              </NuxtLink>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/img/python-breakthrough-min.jpeg"
              alt="Python ПРОрыв - курс веб-разработки"
              class="w-full h-auto"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getConfig } = useConfig()
const config = await getConfig()
</script>

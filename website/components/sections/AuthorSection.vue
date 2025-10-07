<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-lg p-8">
          <div class="flex-shrink-0 w-48 h-48">
            <img
              src="/img/avatar-square-min.jpg"
              alt="Сурен Хоренян"
              class="w-48 h-48 rounded-full object-cover shadow-lg"
              loading="eager"
              decoding="async"
            />
          </div>

          <div class="flex-1">
            <h2 class="text-3xl font-bold mb-2">{{ config.author.name }}</h2>
            <p class="text-xl text-primary-600 mb-4">Автор курса</p>
            <p class="text-gray-700 whitespace-pre-line mb-4">{{ config.author.bio }}</p>

            <div class="flex gap-3 flex-wrap">
              <a
                v-for="link in config.author.links"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold"
              >
                {{ link.name }}
              </a>
            </div>
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

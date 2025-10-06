<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <header v-if="sectionTitle || sectionSubtitle" class="text-center mb-12">
          <h2 v-if="sectionTitle" class="text-3xl font-bold mb-3">{{ sectionTitle }}</h2>
          <p v-if="sectionSubtitle" class="text-lg text-gray-600">{{ sectionSubtitle }}</p>
        </header>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="category in data.categories"
            :key="category.title"
            class="bg-gray-50 rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl" aria-hidden="true">{{ category.icon }}</span>
              <h3 class="text-xl font-semibold text-primary-600">{{ category.title }}</h3>
            </div>
            <ul class="space-y-2">
              <li
                v-for="item in category.items"
                :key="item.title"
                class="flex items-center gap-3 text-gray-700"
              >
                <span v-if="item.icon" class="text-lg" aria-hidden="true">{{ item.icon }}</span>
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TechnologyStackData } from '~/types/content'

const props = defineProps<{ data: TechnologyStackData }>()

const { t } = useI18n()

const sectionTitle = computed(() => props.data.title || t('home.technologyStackTitle'))
const sectionSubtitle = computed(() => props.data.subtitle || t('home.technologyStackSubtitle'))
</script>

<template>
  <section ref="sectionRef" class="py-16 bg-white">
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
            <div class="flex items-center gap-3 mb-7">
              <template v-if="category.path">
                <img
                  v-show="loadedPaths[category.path]"
                  :src="category.path"
                  :alt="category.title"
                  class="w-10 h-10 icon-fade-in"
                  aria-hidden="true"
                  @load="onImageLoad(category.path)"
                  @error="onImageError(category.path)"
                />
                <span
                  v-show="!loadedPaths[category.path]"
                  class="text-5xl"
                  aria-hidden="true"
                >{{ category.icon }}</span>
              </template>
              <span v-else-if="category.icon" class="text-5xl" aria-hidden="true">{{ category.icon }}</span>
              <h3 class="text-xl font-bold text-primary-600">{{ category.title }}</h3>
            </div>
            <ul class="space-y-3">
              <li
                v-for="item in category.items"
                :key="item.title"
                class="flex items-center gap-3 text-gray-700"
              >
                <template v-if="item.path">
                  <img
                    v-show="loadedPaths[item.path]"
                    :src="item.path"
                    :alt="item.title"
                    class="w-8 h-8 icon-fade-in"
                    aria-hidden="true"
                    @load="onImageLoad(item.path)"
                    @error="onImageError(item.path)"
                  />
                  <span
                    v-show="!loadedPaths[item.path]"
                    class="text-2xl mr-2"
                    aria-hidden="true"
                  >{{ item.icon }}</span>
                </template>
                <span v-else-if="item.icon" class="text-2xl" aria-hidden="true">{{ item.icon }}</span>
                <span class="font-semibold">{{ item.title }}</span>
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

const loadedPaths = reactive<Record<string, boolean>>({})
const sectionRef = ref<HTMLElement>()

const onImageLoad = (path: string) => {
  loadedPaths[path] = true
}

const onImageError = (path: string) => {
  loadedPaths[path] = false
}

onMounted(() => {
  if (!sectionRef.value) return

  const images = sectionRef.value.querySelectorAll('img')
  images.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      const path = img.getAttribute('src')
      if (path) {
        loadedPaths[path] = true
      }
    }
  })
})
</script>

<style scoped>
.icon-fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

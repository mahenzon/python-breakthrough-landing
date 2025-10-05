<template>
  <div>
    <!-- Hero Section with Course Image -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <!-- Course Info -->
            <div>
              <h1 class="text-5xl font-bold mb-6">{{ config.course.title }}</h1>
              <p class="text-xl text-gray-600 mb-6">{{ config.course.subtitle }}</p>
              <p class="text-lg text-gray-700 mb-8">{{ $t('home.shortDescription') }}</p>
              
              <div class="flex gap-4 flex-wrap">
                <NuxtLink to="/modules" class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold">
                  {{ $t('nav.modules') }}
                </NuxtLink>
                <NuxtLink to="/collaboration" class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold">
                  {{ $t('nav.collaboration') }}
                </NuxtLink>
              </div>
            </div>
            
            <!-- Course Image -->
            <div class="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://placehold.co/1024x768/2563eb/ffffff?text=Python+%D0%9F%D0%A0%D0%9E%D1%80%D1%8B%D0%B2" 
                alt="Python ПРОрыв - курс веб-разработки"
                class="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Author Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-lg p-8">
            <!-- Author Photo -->
            <div class="flex-shrink-0">
              <img 
                src="https://placehold.co/200x200/6366f1/ffffff?text=Сурен" 
                alt="Сурен Хоренян"
                class="w-48 h-48 rounded-full object-cover shadow-lg"
              />
            </div>
            
            <!-- Author Info -->
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
    
    <!-- Statistics Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ $t('stats.title') }}</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.modulesCount }}</div>
            <div class="text-gray-600 text-sm">{{ pluralizeModules(stats.modulesCount) }}</div>
          </div>
          
          <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.totalLessons }}</div>
            <div class="text-gray-600 text-sm">{{ pluralizeLessons(stats.totalLessons) }}</div>
          </div>
          
          <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.totalDurationFormatted }}</div>
            <div class="text-gray-600 text-sm">{{ $t('stats.totalVideosDuration') }}</div>
          </div>
          
          <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stats.numberOfStudents }}</div>
            <div class="text-gray-600 text-sm">{{ $t('stats.students') }}</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- What You Will Learn Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('home.whatYouLearn') }}</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="(item, index) in whatYouLearnItems" 
              :key="index"
              class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
            >
              <span class="text-primary-600 font-bold text-xl flex-shrink-0">✓</span>
              <span class="text-gray-700">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Modules Accordion Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('course.modules') }}</h2>
          
          <!-- Expand/Collapse All -->
          <div class="flex justify-end mb-4">
            <button 
              class="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
              @click="toggleAllModules()"
            >
              {{ allModulesExpanded ? $t('accordion.collapseAll') : $t('accordion.expandAll') }}
            </button>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="(module, moduleIndex) in course.modules" 
              :key="module.id"
              class="bg-white rounded-lg shadow"
            >
              <!-- Module Header -->
              <div class="p-6 border-b">
                <div class="flex justify-between items-start gap-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2">{{ module.name }}</h3>
                    <div class="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                      <span>{{ $t('course.topicsCount') }}: {{ module.topics.length }}</span>
                      <span>{{ $t('course.lessonsCount') }}: {{ countModuleLessons(module) }}</span>
                      <span v-if="getModuleDurationMinutes(module) > 0">{{ $t('course.totalVideo') }} {{ formatModuleDuration(module) }}</span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button
                      class="p-2 hover:bg-gray-100 rounded transition"
                      @click="toggleModule(moduleIndex)"
                    >
                      <span class="transform transition-transform inline-block" :class="{ 'rotate-180': openModules[moduleIndex] }">
                        ▼
                      </span>
                    </button>
                    <NuxtLink 
                      :to="`/modules/${module.id}`"
                      class="px-4 py-2 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                    >
                      Подробнее
                    </NuxtLink>
                  </div>
                </div>
              </div>
              
              <!-- Module Content (Topics) -->
              <div v-show="openModules[moduleIndex]" class="p-6">
                <div class="space-y-3">
                  <div 
                    v-for="(topic, topicIndex) in module.topics" 
                    :key="topic.id"
                    class="border-l-4 border-primary-200 pl-4 py-2"
                  >
                    <div class="font-semibold mb-1">{{ topicIndex + 1 }}. {{ topic.name }}</div>
                    <div class="text-sm text-gray-600 mb-2">
                      <span>{{ $t('course.lessonsCount') }}: {{ topic.lessons.length }}</span>
                      <span v-if="getTopicDurationMinutes(topic) > 0"> • {{ getTopicDuration(topic) }}</span>
                    </div>
                    <div class="pl-4 space-y-1">
                      <div 
                        v-for="(lesson, lessonIndex) in topic.lessons" 
                        :key="lesson.order"
                        class="text-sm text-gray-500"
                      >
                        {{ lessonIndex + 1 }}. {{ lesson.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- About Course Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-center">{{ $t('home.aboutCourse') }}</h2>
          <p class="text-lg text-gray-700 text-center leading-relaxed">
            {{ $t('home.aboutCourseText') }}
          </p>
        </div>
      </div>
    </section>
    
    <!-- For Whom Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('home.forWhom') }}</h2>
          <div class="space-y-4">
            <p 
              v-for="(text, index) in forWhomItems" 
              :key="index"
              class="text-lg text-gray-700 leading-relaxed"
            >
              {{ text }}
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Requirements Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-center">{{ $t('home.requirements') }}</h2>
          <p class="text-lg text-gray-700 mb-4 text-center">{{ $t('home.requirementsText') }}</p>
          <ul class="list-disc list-inside space-y-2 max-w-2xl mx-auto">
            <li 
              v-for="(item, index) in requirementsItems" 
              :key="index"
              class="text-lg text-gray-700"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    
    <!-- How It Works Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('home.howItWorks') }}</h2>
          <div class="space-y-4">
            <p 
              v-for="(text, index) in howItWorksItems" 
              :key="index"
              class="text-lg text-gray-700 leading-relaxed"
            >
              {{ text }}
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- What You Get Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('home.whatYouGet') }}</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="(item, index) in whatYouGetItems" 
              :key="index"
              class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg shadow"
            >
              <span class="text-primary-600 font-bold text-xl flex-shrink-0">★</span>
              <span class="text-gray-700">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
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
  </div>
</template>

<script setup lang="ts">
import type { Module, Topic } from '~/types/course'

const { getStatistics, getCourseData } = useCourseData()
const { getConfig } = useConfig()
const { t, tm } = useI18n()

const config = await getConfig()
const stats = await getStatistics(config.statistics.numberOfStudents)
const course = await getCourseData()

// Extract translation arrays as strings
const whatYouLearnItems = (tm('home.whatYouLearnList') as string[])
const forWhomItems = (tm('home.forWhomText') as string[])
const requirementsItems = (tm('home.requirementsList') as string[])
const howItWorksItems = (tm('home.howItWorksText') as string[])
const whatYouGetItems = (tm('home.whatYouGetList') as string[])

// Module accordion state
const openModules = ref<boolean[]>(new Array(course.modules.length).fill(false))
const allModulesExpanded = computed(() => openModules.value.every(v => v))

function toggleModule(index: number) {
  openModules.value[index] = !openModules.value[index]
}

function toggleAllModules() {
  const shouldExpand = !allModulesExpanded.value
  openModules.value = new Array(course.modules.length).fill(shouldExpand)
}

// Helper functions
function countModuleLessons(module: Module): number {
  return module.topics.reduce((sum, topic) => sum + topic.lessons.length, 0)
}

function formatDuration(minutes: number | undefined): string {
  if (!minutes)
    return '—'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return mins > 0 ? `${hours} ч ${mins} м` : `${hours} ч`
  }
  return `${mins} м`
}

function getModuleDurationMinutes(module: Module): number {
  return module.topics.reduce((sum, topic) => {
    return sum + topic.lessons.reduce((topicSum, lesson) => topicSum + (lesson.duration_minutes || 0), 0)
  }, 0)
}

function formatModuleDuration(module: Module): string {
  const totalMinutes = getModuleDurationMinutes(module)
  return formatDuration(totalMinutes)
}

function getTopicDurationMinutes(topic: Topic): number {
  return topic.lessons.reduce((sum, lesson) => sum + (lesson.duration_minutes || 0), 0)
}

function getTopicDuration(topic: Topic): string {
  const totalMinutes = getTopicDurationMinutes(topic)
  return formatDuration(totalMinutes)
}

// Pluralization functions for Russian
function pluralizeLessons(count: number): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} Уроков`
  }
  if (lastDigit === 1) {
    return `${count} Урок`
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} Урока`
  }
  return `${count} Уроков`
}

function pluralizeModules(count: number): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} Модулей`
  }
  if (lastDigit === 1) {
    return `${count} Модуль`
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} Модуля`
  }
  return `${count} Модулей`
}

useHead({
  title: `${config.course.title} - ${t('brand.name')}`,
  meta: [
    { name: 'description', content: `${config.course.subtitle}. ${t('home.shortDescription')}` },
    { property: 'og:title', content: config.course.title },
    { property: 'og:description', content: config.course.subtitle },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://placehold.co/1200x630/2563eb/ffffff?text=Python+%D0%9F%D0%A0%D0%9E%D1%80%D1%8B%D0%B2' },
  ],
})
</script>

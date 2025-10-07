<template>
  <div v-if="loading" class="text-gray-500 text-sm">
    Loading technologies...
  </div>

  <div v-else-if="error" class="text-red-500 text-sm">
    {{ error }}
  </div>

  <div v-else-if="techList.length === 0">
    <!-- Empty state - show nothing -->
  </div>

  <div
    v-else
    :class="containerClasses"
  >
    <!-- Horizontal Layout -->
    <template v-if="layout === 'horizontal'">
      <div
        v-for="tech in techList"
        :key="tech.name"
        class="relative group"
      >
        <img
          :src="tech.path"
          :alt="tech.name"
          :title="tech.text"
          :class="iconClasses"
          loading="lazy"
        />
        <span class="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap pointer-events-none z-10">
          {{ tech.text }}
        </span>
      </div>
    </template>

    <!-- Vertical Layout -->
    <template v-else>
      <div
        v-for="tech in techList"
        :key="tech.name"
        class="flex items-center gap-3"
      >
        <img
          :src="tech.path"
          :alt="tech.name"
          :class="iconClasses"
          loading="lazy"
        />
        <span v-if="showText" class="text-gray-700">{{ tech.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { EnrichedModuleTech } from '~/types/content'

// Props
interface Props {
  moduleId: string
  layout?: 'horizontal' | 'vertical'
  showText?: boolean
  iconSize?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  showText: false,
  iconSize: 'md',
})

// State
const techList = ref<EnrichedModuleTech[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Load tech data
const { getEnrichedModuleTech } = useModuleTechData()

try {
  techList.value = await getEnrichedModuleTech(props.moduleId)
  loading.value = false
} catch (e) {
  console.error('Failed to load module tech:', e)
  error.value = 'Failed to load technologies'
  loading.value = false
}

// Computed classes
const containerClasses = computed(() => {
  if (props.layout === 'horizontal') {
    return 'flex flex-wrap gap-2 items-center'
  } else {
    return 'space-y-2'
  }
})

const iconClasses = computed(() => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }

  const baseClasses = 'object-contain'
  const sizeClass = sizeMap[props.iconSize]

  return `${baseClasses} ${sizeClass}`
})
</script>

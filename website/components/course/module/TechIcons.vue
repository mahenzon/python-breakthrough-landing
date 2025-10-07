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
        @mouseenter="(event) => handleIconHover(tech.name, event)"
      >
        <img
          :src="tech.path"
          :alt="tech.name"
          :title="tech.text"
          :class="iconClasses"
          loading="lazy"
        />
        <span 
          :ref="(el) => setTooltipRef(tech.name, el)"
          :class="getTooltipClasses(tech.name)"
        >
          {{ tech.text }}
          <span :class="getArrowClasses(tech.name)"></span>
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
        <span v-if="showText" class="text-gray-800 text-lg">{{ tech.text }}</span>
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

// Tooltip positioning state
type TooltipPosition = 'left' | 'center' | 'right'
const tooltipRefs = new Map<string, HTMLElement>()
const tooltipPositions = ref<Map<string, TooltipPosition>>(new Map())

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

// Tooltip positioning logic
const updateTooltipPosition = (key: string, iconElement: HTMLElement) => {
  const tooltipElement = tooltipRefs.get(key)
  if (!tooltipElement) return

  const iconRect = iconElement.getBoundingClientRect()
  const tooltipRect = tooltipElement.getBoundingClientRect()
  
  const viewportWidth = window.innerWidth
  const tooltipWidth = tooltipRect.width
  const halfTooltipWidth = tooltipWidth / 2
  
  const iconCenterX = iconRect.left + iconRect.width / 2
  
  let position: TooltipPosition = 'center'
  
  // Check if tooltip would overflow left edge
  if (iconCenterX - halfTooltipWidth < 10) {
    position = 'left'
  }
  // Check if tooltip would overflow right edge
  else if (iconCenterX + halfTooltipWidth > viewportWidth - 10) {
    position = 'right'
  }
  
  tooltipPositions.value.set(key, position)
}

// Set tooltip ref
const setTooltipRef = (key: string, el: Element | null) => {
  if (el) {
    tooltipRefs.set(key, el as HTMLElement)
  }
}

// Handle icon hover
const handleIconHover = (key: string, event: MouseEvent) => {
  const iconElement = event.currentTarget as HTMLElement
  nextTick(() => {
    updateTooltipPosition(key, iconElement)
  })
}

// Get tooltip classes based on position
const getTooltipClasses = (key: string) => {
  const position = tooltipPositions.value.get(key) || 'center'
  return [
    'tooltip-base',
    `tooltip-${position}`,
  ]
}

// Get arrow classes based on position
const getArrowClasses = (key: string) => {
  const position = tooltipPositions.value.get(key) || 'center'
  return [
    'tooltip-arrow',
    `tooltip-arrow-${position}`,
  ]
}

// Debounce utility
const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Handle window resize
const handleResize = debounce(() => {
  // Recalculate all tooltip positions
  tooltipPositions.value.clear()
}, 300)

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Computed classes
const containerClasses = computed(() => {
  if (props.layout === 'horizontal') {
    return 'flex flex-wrap gap-2 items-center w-full max-w-full'
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

<style scoped>
/* Base tooltip styles - disabled on mobile to prevent overflow */
.tooltip-base {
  display: none;
}

/* Enable tooltips only on medium screens and up */
@media (min-width: 768px) {
  .tooltip-base {
    @apply absolute hidden group-hover:block;
    @apply bg-gray-900 text-white text-xs rounded;
    @apply py-1 px-2 bottom-full mb-2 whitespace-nowrap pointer-events-none z-10;
    opacity: 0;
    animation: fadeIn 0.2s ease-in-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

/* Tooltip positioning variants */
.tooltip-center {
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-left {
  left: 0;
  transform: none;
}

.tooltip-right {
  right: 0;
  transform: none;
}

/* Tooltip arrow styles */
.tooltip-arrow {
  @apply absolute;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid theme('colors.gray.900');
  bottom: -4px;
}

.tooltip-arrow-center {
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-arrow-left {
  @apply left-3;
}

.tooltip-arrow-right {
  @apply right-3;
}
</style>

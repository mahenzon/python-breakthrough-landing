<template>
  <span
    v-if="shouldShowBadge"
    :class="badgeClasses"
    :aria-label="badgeText"
    role="status"
  >
    <span v-if="status === 'ready'" aria-hidden="true">✓</span>
    <span v-else aria-hidden="true">🔨</span>
    <span class="ml-1">&nbsp;{{ badgeText }}</span>
  </span>
</template>

<script setup lang="ts">
import type { ModuleStatus } from '~/types/course'

interface Props {
  status?: ModuleStatus
  size?: 'sm' | 'md' | 'lg'
  showReady?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: null,
  size: 'md',
  showReady: false,
})

const { t } = useI18n()

const shouldShowBadge = computed(() => {
  if (props.status === 'in_development')
    return true
  if (props.status === 'ready' && props.showReady)
    return true
  return false
})

const badgeText = computed(() => {
  return props.status === 'ready'
    ? t('course.status.ready')
    : t('course.status.inDevelopment')
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs px-2 py-0.5'
    case 'lg':
      return 'text-base px-3 py-1'
    default:
      return 'text-sm px-2.5 py-0.5'
  }
})

const statusClasses = computed(() => {
  return props.status === 'ready'
    ? 'bg-green-100 text-green-800'
    : 'bg-amber-100 text-amber-800 border border-amber-300'
})

const badgeClasses = computed(() => {
  return `inline-flex items-center rounded-full font-medium ${sizeClasses.value} ${statusClasses.value}`
})
</script>

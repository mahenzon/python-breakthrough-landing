<template>
  <div 
    class="tooltip-wrapper inline-block"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleMouseEnter"
    @focusout="handleMouseLeave"
  >
    <div ref="referenceRef" class="tooltip-trigger">
      <slot></slot>
    </div>

    <Teleport to="body">
      <div 
        v-show="isVisible"
        ref="tooltipRef" 
        class="tooltip-content bg-gray-900 text-white text-xs rounded py-1.5 px-2.5 shadow-lg z-50 max-w-xs break-words"
        role="tooltip"
        :aria-hidden="!isVisible"
      >
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Placement } from '@popperjs/core'

interface Props {
  content?: string
  placement?: Placement
  disabled?: boolean
  showDelay?: number
  hideDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  placement: 'top',
  disabled: false,
  showDelay: 0,
  hideDelay: 0,
})

const referenceRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

const { isVisible, initTooltip, show, hide } = useTooltip({
  placement: props.placement,
  offset: [0, 8],
  showDelay: props.showDelay,
  hideDelay: props.hideDelay,
})

const handleMouseEnter = () => {
  if (props.disabled) return
  show()
}

const handleMouseLeave = () => {
  if (props.disabled) return
  hide()
}

onMounted(() => {
  if (referenceRef.value && tooltipRef.value) {
    initTooltip(referenceRef.value, tooltipRef.value)
  }
})
</script>

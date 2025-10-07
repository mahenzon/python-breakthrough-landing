import { createPopper } from '@popperjs/core'
import type { Instance, Placement } from '@popperjs/core'

export interface TooltipOptions {
  placement?: Placement
  offset?: [number, number]
  showDelay?: number
  hideDelay?: number
}

export function useTooltip(options: TooltipOptions = {}) {
  const {
    placement = 'top',
    offset = [0, 8],
    showDelay = 0,
    hideDelay = 0,
  } = options

  const popperInstance = ref<Instance | null>(null)
  const isVisible = ref(false)
  let showTimer: ReturnType<typeof setTimeout> | null = null
  let hideTimer: ReturnType<typeof setTimeout> | null = null

  const initTooltip = (referenceEl: HTMLElement, tooltipEl: HTMLElement) => {
    if (!referenceEl || !tooltipEl) {
      return
    }

    popperInstance.value = createPopper(referenceEl, tooltipEl, {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset,
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['bottom', 'left', 'right'],
            boundary: 'viewport',
          },
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: 'viewport',
            padding: 8,
          },
        },
      ],
    })
  }

  const show = () => {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }

    if (showDelay > 0) {
      showTimer = setTimeout(() => {
        isVisible.value = true
        popperInstance.value?.update()
      }, showDelay)
    } else {
      isVisible.value = true
      popperInstance.value?.update()
    }
  }

  const hide = () => {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }

    if (hideDelay > 0) {
      hideTimer = setTimeout(() => {
        isVisible.value = false
      }, hideDelay)
    } else {
      isVisible.value = false
    }
  }

  const destroy = () => {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    if (popperInstance.value) {
      popperInstance.value.destroy()
      popperInstance.value = null
    }
    isVisible.value = false
  }

  onUnmounted(() => {
    destroy()
  })

  return {
    isVisible,
    initTooltip,
    show,
    hide,
    destroy,
  }
}

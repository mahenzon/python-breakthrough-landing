<template>
  <!-- Card layout for /modules page -->
  <div
    v-if="layout === 'card'"
    class="ghost-module-card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg shadow-lg p-6 hover:shadow-xl transition opacity-90"
  >
    <div class="text-center">
      <div class="text-5xl mb-4" aria-hidden="true">
        📦
      </div>
      <h3 class="text-2xl font-bold mb-3 text-gray-800">
        {{ $t('course.ghostModule.title') }}
      </h3>
      <p class="text-gray-600 mb-2">
        {{ displayText }}
      </p>
      <p class="text-sm text-gray-500">
        {{ $t('course.ghostModule.followUpdates') }}
      </p>
    </div>
  </div>

  <!-- Accordion layout for main page -->
  <div
    v-else
    class="ghost-module-accordion bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg shadow opacity-90"
  >
    <div class="p-6">
      <div class="flex items-start gap-4">
        <div class="text-4xl" aria-hidden="true">
          📦
        </div>
        <div class="flex-1">
          <h3 class="text-2xl lg:text-3xl font-bold mb-2 text-gray-800">
            {{ $t('course.ghostModule.title') }}
          </h3>
          <p class="text-md lg:text-xl text-gray-600 mb-2">
            {{ displayText }}
          </p>
          <p class="text-md lg:text-lg text-gray-500">
            {{ $t('course.ghostModule.followUpdates') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  customText?: string
  layout?: 'card' | 'accordion'
}

const props = withDefaults(defineProps<Props>(), {
  customText: '',
  layout: 'accordion',
})

const { t } = useI18n()

const displayText = computed(() => {
  return props.customText || t('course.ghostModule.defaultText')
})
</script>

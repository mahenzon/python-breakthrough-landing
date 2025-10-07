<template>
  <div class="ghost-topic bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-dashed border-gray-300 border-l-4 border-l-blue-300 rounded p-4 my-4">
    <div class="flex items-start gap-3">
      <div class="text-2xl" aria-hidden="true">
        ✨
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-lg mb-2 text-gray-600">
          <span v-if="topicNumber">{{ topicNumber }}. </span>
          {{ $t('course.ghostTopic.title') }}
        </h4>
        <p class="text-gray-500 italic mb-2">
          {{ displayText }}
        </p>
        <p class="text-sm text-gray-400">
          {{ $t('course.ghostTopic.followUpdates') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  customText?: string
  topicNumber?: number
}

const props = defineProps<Props>()

const { t } = useI18n()

const displayText = computed(() => {
  return props.customText || t('course.ghostTopic.defaultText')
})
</script>

<template>
  <section
    :class="['py-8 cursor-pointer transition-all', bgClass]"
    @click="toggleExpanded"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-center gap-3 mb-8">
          <h2 class="text-3xl font-bold text-center">
            <slot name="title"></slot>
          </h2>
          <svg
            :class="['w-8 h-8 transition-transform duration-300', { 'rotate-180': isExpanded }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div
          v-show="isExpanded"
          class="animate-fade-in"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  bgClass?: string
  defaultExpanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bgClass: 'bg-gray-50',
  defaultExpanded: false,
})

const isExpanded = ref(props.defaultExpanded)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

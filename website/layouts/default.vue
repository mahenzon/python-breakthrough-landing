<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-primary-600">
            {{ $t('brand.name') }}
          </NuxtLink>
          
          <div class="hidden md:flex space-x-6">
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.to"
              :to="link.to" 
              :exact-active-class="link.exact ? 'font-semibold text-primary-600' : undefined"
              :active-class="!link.exact ? 'font-semibold text-primary-600' : undefined"
              class="hover:text-primary-600 transition"
            >
              {{ $t(link.labelKey) }}
            </NuxtLink>
          </div>
          
          <!-- Mobile menu button -->
          <button class="md:hidden text-gray-700" @click="mobileMenuOpen = !mobileMenuOpen">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-2 pb-4">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.to"
            :to="link.to" 
            :exact-active-class="link.exact ? 'font-semibold text-primary-600' : undefined"
            :active-class="!link.exact ? 'font-semibold text-primary-600' : undefined"
            class="block py-2 hover:text-primary-600 transition"
            @click="mobileMenuOpen = false"
          >
            {{ $t(link.labelKey) }}
          </NuxtLink>
        </div>
      </nav>
    </header>
    
    <main class="flex-grow">
      <slot ></slot>
    </main>
    
    <footer class="bg-white border-t mt-12">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center text-sm text-gray-600">
          © {{ new Date().getFullYear() }} {{ $t('brand.name') }}. {{ $t('footer.copyright') }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { navigationLinks } from '~/config/navigation'

const mobileMenuOpen = ref(false)
const navLinks = navigationLinks
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-primary-600">
            {{ $t('brand.name') }}
          </NuxtLink>
          
          <div class="hidden md:flex space-x-6">
            <NuxtLink to="/" exact-active-class="font-semibold text-primary-600" class="hover:text-primary-600 transition">{{ $t('nav.home') }}</NuxtLink>
            <NuxtLink to="/modules" active-class="font-semibold text-primary-600" class="hover:text-primary-600 transition">{{ $t('nav.modules') }}</NuxtLink>
            <NuxtLink to="/links" active-class="font-semibold text-primary-600" class="hover:text-primary-600 transition">{{ $t('nav.courseLinks') }}</NuxtLink>
            <NuxtLink to="/statistics" active-class="font-semibold text-primary-600" class="hover:text-primary-600 transition">{{ $t('nav.statistics') }}</NuxtLink>
            <NuxtLink to="/projects" active-class="font-semibold text-primary-600" class="hover:text-primary-600 transition">{{ $t('nav.projects') }}</NuxtLink>
            <NuxtLink to="/faq" active-class="font-semibold text-primary-600" class="hover:text-primary-600 transition">{{ $t('nav.faq') }}</NuxtLink>
            <NuxtLink to="/latest-changes" active-class="font-semibold text-primary-600" class="hover:text-primary-600 transition">{{ $t('nav.latest') }}</NuxtLink>
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
          <NuxtLink to="/" exact-active-class="font-semibold text-primary-600" class="block py-2 hover:text-primary-600 transition" @click="mobileMenuOpen = false">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink to="/modules" active-class="font-semibold text-primary-600" class="block py-2 hover:text-primary-600 transition" @click="mobileMenuOpen = false">{{ $t('nav.modules') }}</NuxtLink>
          <NuxtLink to="/links" active-class="font-semibold text-primary-600" class="block py-2 hover:text-primary-600 transition" @click="mobileMenuOpen = false">{{ $t('nav.courseLinks') }}</NuxtLink>
          <NuxtLink to="/statistics" active-class="font-semibold text-primary-600" class="block py-2 hover:text-primary-600 transition" @click="mobileMenuOpen = false">{{ $t('nav.statistics') }}</NuxtLink>
          <NuxtLink to="/projects" active-class="font-semibold text-primary-600" class="block py-2 hover:text-primary-600 transition" @click="mobileMenuOpen = false">{{ $t('nav.projects') }}</NuxtLink>
          <NuxtLink to="/faq" active-class="font-semibold text-primary-600" class="block py-2 hover:text-primary-600 transition" @click="mobileMenuOpen = false">{{ $t('nav.faq') }}</NuxtLink>
          <NuxtLink to="/latest-changes" active-class="font-semibold text-primary-600" class="block py-2 hover:text-primary-600 transition" @click="mobileMenuOpen = false">{{ $t('nav.latest') }}</NuxtLink>
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
const mobileMenuOpen = ref(false)
</script>

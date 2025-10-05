// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],

  css: ['~/assets/css/tailwind.css'],

  i18n: {
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', file: 'ru.ts', name: 'Русский' }
    ],
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },

  site: {
    url: 'https://yourdomain.com', // Update with actual domain
  },

  nitro: {
    preset: 'github_pages'
  }
})

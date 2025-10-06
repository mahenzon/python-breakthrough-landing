// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/tailwind.css'],

  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', file: 'ru.ts', name: 'Русский' },
    ],
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
  },

  site: {
    url: 'https://web.mahenzon.ru',
  },

  sitemap: {
    strictNuxtContentPaths: true,
    urls: async () => {
      // Dynamic routes will be added by nuxt/sitemap automatically
      return []
    },
    defaults: {
      changefreq: 'weekly',
      priority: 0.5,
    },
  },

  nitro: {
    preset: 'github_pages',
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {enabled: true},

  css: [
      '~/assets/css/main.css'
  ],

  modules: ['@nuxt/fonts'],

  // Для GitHub Pages
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/sPrac/' : '/',
  },
  // Если используете статическую генерацию
  ssr: false,
})
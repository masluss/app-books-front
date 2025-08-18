// nuxt.config.js
export default defineNuxtConfig({
  // ... other options
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  css: ['@/assets/styles/main.scss'],
  runtimeConfig: {
    public: { apiBase: process.env.NUXT_PUBLIC_API_BASE }
  }
})
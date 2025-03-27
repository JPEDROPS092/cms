export default {
  // Global page headers
  head: {
    title: 'CMS Frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'CMS Frontend with Nuxt.js and Vuetify' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Axios module configuration
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:8000', // FastAPI backend URL
    proxy: false,
    credentials: false // Não incluir credenciais nas requisições
  },

  // Vuetify module configuration
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  },

  // Build Configuration
  build: {}
}

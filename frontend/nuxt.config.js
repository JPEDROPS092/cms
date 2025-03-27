export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  
  // Configuração para GitHub Pages
  router: {
    base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/cms/' : '/'
  },
  
  // Global page headers
  head: {
    title: 'CMS Frontend',
    htmlAttrs: {
      lang: 'pt-BR'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Sistema de Gerenciamento de Conteúdo com Nuxt.js e Vuetify' }
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
    baseURL: process.env.NODE_ENV === 'production' 
      ? 'https://api-cms-demo.herokuapp.com' // URL da API em produção (substitua pelo seu endpoint real)
      : (process.env.API_URL || 'http://localhost:8000'), // URL da API em desenvolvimento
    proxy: false,
    credentials: false // Não incluir credenciais nas requisições
  },
  
  // Configuração para geração estática
  generate: {
    fallback: true // Para SPA fallback no GitHub Pages
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

<template>
  <div>
    <v-card class="mb-5">
      <v-card-title class="headline">
        Bem-vindo ao Sistema de Gerenciamento de Conteúdo
      </v-card-title>
      <v-card-text>
        <p>Este é um sistema simples de CMS desenvolvido com:</p>
        <v-list dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-server</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Backend: FastAPI e SQLAlchemy</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-vuejs</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Frontend: Nuxt.js e Vuetify (Material Design)</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          to="/posts"
        >
          Ver Posts
        </v-btn>
        <v-btn
          color="primary"
          to="/posts/new"
        >
          Criar Novo Post
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="recentPosts.length > 0">
      <v-card-title>Posts Recentes</v-card-title>
      <v-card-text>
        <v-list two-line>
          <v-list-item
            v-for="post in recentPosts"
            :key="post.id"
            :to="`/posts/${post.id}`"
          >
            <v-list-item-content>
              <v-list-item-title v-text="post.title"></v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  x-small
                  :color="post.published ? 'success' : 'grey'"
                  class="mr-2"
                >
                  {{ post.published ? 'Publicado' : 'Rascunho' }}
                </v-chip>
                {{ formatDate(post.created_at) }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-text class="text-center">
        <p>Nenhum post encontrado. Comece criando um novo post!</p>
        <v-btn
          color="primary"
          to="/posts/new"
          class="mt-3"
        >
          Criar Primeiro Post
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recentPosts: []
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.$get('/posts')
      this.recentPosts = response.slice(0, 5) // Mostrar apenas os 5 posts mais recentes
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR')
    }
  }
}
</script>

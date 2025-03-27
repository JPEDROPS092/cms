<template>
  <div>
    <v-card v-if="post">
      <v-card-title class="headline">
        {{ post.title }}
        <v-chip
          :color="post.published ? 'success' : 'grey'"
          class="ml-4"
          small
        >
          {{ post.published ? 'Publicado' : 'Rascunho' }}
        </v-chip>
      </v-card-title>
      
      <v-card-subtitle>
        Criado em {{ formatDate(post.created_at) }}
      </v-card-subtitle>
      
      <v-divider></v-divider>
      
      <v-card-text>
        <div class="post-content">
          {{ post.content }}
        </div>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          to="/posts"
        >
          Voltar
        </v-btn>
        <v-btn
          color="warning"
          :to="`/posts/${post.id}/edit`"
        >
          Editar
        </v-btn>
        <v-btn
          color="error"
          @click="confirmDelete"
        >
          Excluir
        </v-btn>
      </v-card-actions>
    </v-card>
    
    <v-skeleton-loader
      v-else
      type="card"
      :loading="loading"
    ></v-skeleton-loader>
    
    <!-- Diálogo de confirmação para exclusão -->
    <v-dialog
      v-model="deleteDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Confirmar exclusão
        </v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir o post "{{ post ? post.title : '' }}"? Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="deleteDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="error"
            @click="deletePost"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Snackbar para mensagens -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      loading: true,
      deleteDialog: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success'
    }
  },
  async fetch() {
    await this.fetchPost()
  },
  methods: {
    async fetchPost() {
      this.loading = true
      try {
        this.post = await this.$axios.$get(`/posts/${this.$route.params.id}`)
      } catch (error) {
        console.error('Erro ao buscar post:', error)
        this.showSnackbar('Erro ao carregar post', 'error')
        this.$router.push('/posts')
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR')
    },
    confirmDelete() {
      this.deleteDialog = true
    },
    async deletePost() {
      try {
        await this.$axios.$delete(`/posts/${this.post.id}`)
        this.showSnackbar('Post excluído com sucesso', 'success')
        this.$router.push('/posts')
      } catch (error) {
        console.error('Erro ao excluir post:', error)
        this.showSnackbar('Erro ao excluir post', 'error')
      } finally {
        this.deleteDialog = false
      }
    },
    showSnackbar(text, color = 'success') {
      this.snackbarText = text
      this.snackbarColor = color
      this.snackbar = true
    }
  }
}
</script>

<style scoped>
.post-content {
  font-size: 1.1rem;
  line-height: 1.6;
  white-space: pre-line;
}
</style>

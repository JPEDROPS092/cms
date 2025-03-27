<template>
  <div>
    <v-card>
      <v-card-title>
        Todos os Posts
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      
      <v-data-table
        :headers="headers"
        :items="posts"
        :search="search"
        :loading="loading"
        loading-text="Carregando... Aguarde"
        no-data-text="Nenhum post encontrado"
        class="elevation-1"
      >
        <template v-slot:item.published="{ item }">
          <v-chip
            :color="item.published ? 'success' : 'grey'"
            small
          >
            {{ item.published ? 'Publicado' : 'Rascunho' }}
          </v-chip>
        </template>
        
        <template v-slot:item.created_at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
        
        <template v-slot:item.actions="{ item }">
          <v-btn
            small
            icon
            color="primary"
            :to="`/posts/${item.id}`"
            class="mr-2"
          >
            <v-icon small>mdi-eye</v-icon>
          </v-btn>
          
          <v-btn
            small
            icon
            color="warning"
            :to="`/posts/${item.id}/edit`"
            class="mr-2"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          
          <v-btn
            small
            icon
            color="error"
            @click="confirmDelete(item)"
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    
    <v-btn
      color="primary"
      fab
      fixed
      bottom
      right
      class="mb-10"
      to="/posts/new"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    
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
          Tem certeza que deseja excluir o post "{{ selectedPost ? selectedPost.title : '' }}"? Esta ação não pode ser desfeita.
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
      search: '',
      posts: [],
      loading: true,
      headers: [
        { text: 'ID', value: 'id', width: '5%' },
        { text: 'Título', value: 'title', width: '35%' },
        { text: 'Status', value: 'published', width: '10%' },
        { text: 'Data de Criação', value: 'created_at', width: '20%' },
        { text: 'Ações', value: 'actions', sortable: false, width: '15%' }
      ],
      deleteDialog: false,
      selectedPost: null,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success'
    }
  },
  async fetch() {
    await this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      this.loading = true
      try {
        this.posts = await this.$axios.$get('/posts')
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
        this.showSnackbar('Erro ao carregar posts', 'error')
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR')
    },
    confirmDelete(post) {
      this.selectedPost = post
      this.deleteDialog = true
    },
    async deletePost() {
      try {
        await this.$axios.$delete(`/posts/${this.selectedPost.id}`)
        this.showSnackbar('Post excluído com sucesso', 'success')
        this.posts = this.posts.filter(post => post.id !== this.selectedPost.id)
      } catch (error) {
        console.error('Erro ao excluir post:', error)
        this.showSnackbar('Erro ao excluir post', 'error')
      } finally {
        this.deleteDialog = false
        this.selectedPost = null
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

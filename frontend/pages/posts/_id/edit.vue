<template>
  <div>
    <v-card v-if="post">
      <v-card-title>Editar Post</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            v-model="post.title"
            label="Título"
            required
            :rules="titleRules"
          ></v-text-field>
          
          <v-textarea
            v-model="post.content"
            label="Conteúdo"
            required
            :rules="contentRules"
            rows="10"
          ></v-textarea>
          
          <v-switch
            v-model="post.published"
            label="Publicado"
            color="success"
          ></v-switch>
        </v-form>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          :to="`/posts/${$route.params.id}`"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!valid || loading"
          :loading="loading"
          @click="submitForm"
        >
          Atualizar
        </v-btn>
      </v-card-actions>
    </v-card>
    
    <v-skeleton-loader
      v-else
      type="card"
      :loading="loading"
    ></v-skeleton-loader>
    
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
      valid: false,
      loading: true,
      post: null,
      titleRules: [
        v => !!v || 'Título é obrigatório',
        v => v.length <= 100 || 'Título deve ter no máximo 100 caracteres'
      ],
      contentRules: [
        v => !!v || 'Conteúdo é obrigatório'
      ],
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
    async submitForm() {
      if (!this.$refs.form.validate()) return
      
      this.loading = true
      try {
        await this.$axios.$put(`/posts/${this.$route.params.id}`, {
          title: this.post.title,
          content: this.post.content,
          published: this.post.published
        })
        this.showSnackbar('Post atualizado com sucesso', 'success')
        this.$router.push(`/posts/${this.$route.params.id}`)
      } catch (error) {
        console.error('Erro ao atualizar post:', error)
        this.showSnackbar('Erro ao atualizar post', 'error')
      } finally {
        this.loading = false
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

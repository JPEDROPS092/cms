<template>
  <div>
    <v-card>
      <v-card-title>Criar Novo Post</v-card-title>
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
            label="Publicar imediatamente"
            color="success"
          ></v-switch>
        </v-form>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          to="/posts"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!valid || loading"
          :loading="loading"
          @click="submitForm"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
    
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
      loading: false,
      post: {
        title: '',
        content: '',
        published: true
      },
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
  methods: {
    async submitForm() {
      if (!this.$refs.form.validate()) return
      
      this.loading = true
      try {
        const response = await this.$axios.$post('/posts', this.post)
        this.showSnackbar('Post criado com sucesso', 'success')
        this.$router.push(`/posts/${response.id}`)
      } catch (error) {
        console.error('Erro ao criar post:', error)
        this.showSnackbar('Erro ao criar post', 'error')
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

# CMS Frontend

Frontend para o sistema de gerenciamento de conteúdo (CMS) desenvolvido com Nuxt.js e Vuetify (Material UI).

## Tecnologias Utilizadas

- **Nuxt.js**: Framework Vue.js para desenvolvimento de aplicações web
- **Vuetify**: Biblioteca de componentes Material Design para Vue.js
- **Axios**: Cliente HTTP para fazer requisições à API

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Configuração

1. Instale as dependências:

```bash
npm install
# ou
yarn install
```

2. Configure a URL da API no arquivo `nuxt.config.js` (por padrão está configurada para `http://localhost:8000`).

## Executando o Projeto

```bash
# Desenvolvimento com hot-reload
npm run dev
# ou
yarn dev

# Build para produção
npm run build
# ou
yarn build

# Executar versão de produção
npm run start
# ou
yarn start
```

## Estrutura do Projeto

- `assets/`: Arquivos estáticos como SCSS, imagens, etc.
- `components/`: Componentes Vue reutilizáveis
- `layouts/`: Layouts da aplicação
- `pages/`: Páginas da aplicação (rotas são geradas automaticamente)
- `store/`: Gerenciamento de estado com Vuex

## Funcionalidades

- Listagem de posts com busca e ordenação
- Visualização detalhada de posts
- Criação de novos posts
- Edição de posts existentes
- Exclusão de posts
- Interface responsiva com Material Design

# Sistema de Gerenciamento de Conteúdo (CMS)

Um sistema simples de CMS com backend em FastAPI e frontend em Nuxt.js com Material UI.

## Estrutura do Projeto

### 🧰 Tecnologias

#### Backend

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=flat&logo=sqlalchemy&logoColor=white)

#### Frontend

![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00C58E?style=flat&logo=nuxt.js)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=flat&logo=vuetify)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Requisitos

- ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white)
- ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2CA5E0?style=flat&logo=docker&logoColor=white)


## Executando com Docker

Para executar todo o projeto usando Docker Compose:

```bash
# Construir e iniciar os contêineres
docker-compose up --build
#Depois de Construido
docker-compose up #desenvolvimento
```

Após a inicialização, você pode acessar:

- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:8000
- **Documentação da API**: http://localhost:8000/docs![1743102900016](image/README/1743102900016.png)

## Desenvolvimento Local

### Backend

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar servidor de desenvolvimento
uvicorn main:app --reload
```

### Frontend

```bash
# Navegar para a pasta do frontend
cd frontend

# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev
```

## ✨ Funcionalidades

- Criar, listar, visualizar, editar e excluir posts![1743102948462](image/README/1743102948462.png)
- Interface de usuário moderna e responsiva com Material Design![1743102963105](image/README/1743102963105.png)

  ![1743103015409](image/README/1743103015409.png)

  ![1743103171151](image/README/1743103171151.png)
- API RESTful documentada com Swagger
- ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white) Persistência de dados

## 📄 Licença

MIT License - Consulte o arquivo [LICENSE](LICENSE) para detalhes

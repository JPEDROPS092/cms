#!/bin/bash

# Script para fazer deploy do frontend no GitHub Pages

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando processo de deploy para GitHub Pages...${NC}"

# Entrar na pasta do frontend
cd frontend

# Configurar variável de ambiente para GitHub Pages
export DEPLOY_ENV=GH_PAGES

# Instalar dependências
echo -e "${YELLOW}Instalando dependências...${NC}"
npm install

# Gerar a versão estática
echo -e "${YELLOW}Gerando versão estática...${NC}"
npm run generate

# Criar pasta de deploy temporária
echo -e "${YELLOW}Preparando arquivos para deploy...${NC}"
mkdir -p ../gh-pages
cp -r dist/* ../gh-pages/

# Voltar para a raiz do projeto
cd ..

# Verificar se o diretório .git existe
if [ ! -d ".git" ]; then
  echo -e "${YELLOW}Inicializando repositório Git...${NC}"
  git init
  git add .
  git commit -m "Initial commit"
fi

# Verificar se o branch gh-pages já existe
if git show-ref --verify --quiet refs/heads/gh-pages; then
  echo -e "${YELLOW}Branch gh-pages já existe, atualizando...${NC}"
  git checkout gh-pages
  git rm -rf .
  cp -r gh-pages/* .
  rm -rf gh-pages
else
  echo -e "${YELLOW}Criando branch gh-pages...${NC}"
  git checkout --orphan gh-pages
  git rm -rf .
  cp -r gh-pages/* .
  rm -rf gh-pages
fi

# Adicionar arquivo .nojekyll para evitar processamento Jekyll
touch .nojekyll

# Adicionar todos os arquivos
git add .

# Commit das alterações
git commit -m "Deploy to GitHub Pages: $(date)"

echo -e "${GREEN}Arquivos preparados para deploy no branch gh-pages.${NC}"
echo -e "${YELLOW}Para finalizar o deploy, execute:${NC}"
echo -e "${GREEN}git push origin gh-pages --force${NC}"

# Voltar para o branch principal
git checkout main || git checkout master

echo -e "${GREEN}Processo de deploy concluído com sucesso!${NC}"

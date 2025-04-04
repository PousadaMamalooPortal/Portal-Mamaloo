FROM node:18

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e package-lock.json primeiro para otimizar o cache de dependências
COPY package.json package-lock.json ./

# Instalar as dependências do projeto
RUN npm install --include=optional --force

# Copiar o restante do código para o container
COPY . .

# Expor a porta 5173 (que é a porta padrão do Vite)
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev"]

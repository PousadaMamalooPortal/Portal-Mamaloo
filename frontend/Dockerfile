FROM node:18
WORKDIR /app
COPY package.json .
# Instala o Vite globalmente e força instalação de opcionais
RUN npm install -g vite && \
    npm install --include=optional --force && \
    npm rebuild
COPY . .
CMD ["npm", "run", "dev"]
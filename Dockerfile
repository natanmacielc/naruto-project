
# Use a imagem oficial do Node.js como base
FROM node:18.19-alpine

# Instale a Angular CLI globalmente
RUN npm install -g @angular/cli

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o contêiner
COPY . .

# Construir o projeto Angular
RUN npm run build --prod

# Exponha a porta que a aplicação vai rodar
EXPOSE 4200

# Comando para rodar a aplicação
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

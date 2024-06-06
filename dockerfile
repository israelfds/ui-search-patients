# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]

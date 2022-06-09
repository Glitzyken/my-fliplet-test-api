FROM node:alpine
WORKDIR /fliplet-rss
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "start"]
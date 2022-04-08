FROM node:ubuntu
COPY . /server
WORKDIR /server
CMD node server.js
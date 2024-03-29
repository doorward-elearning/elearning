FROM node:12.18

LABEL MAINTAINER="Moses Gitau <gitaumoses4@gmail.com>"
LABEL APPLICATION="doorward"

ENV TERM=xterm-256color

WORKDIR /usr/app

RUN npm install -g @nrwl/nx &&  rm -rf package-lock.json

COPY . /usr/app
COPY .envexample /usr/app/.env

RUN yarn install

FROM node:dubnium

LABEL MAINTAINER="Moses Gitau <gitaumoses4@gmail.com"
LABEL APPLICATION="edudoor-frontend"

ENV TERM=xterm-256color

WORKDIR /usr/app

RUN npm install -g yarn && rm -rf package-lock.json

COPY package.json /usr/app
COPY yarn.lock /usr/app

RUN yarn install

FROM node:dubnium

LABEL MAINTAINER="Moses Gitau <gitaumoses4@gmail.com>"
LABEL APPLICATION = "edudoor-backend"

ENV TERM=xterm-256color

WORKDIR /usr/app

RUN npm install -g @nrwl/nx && rm -rf package-lock.json

COPY package.json /usr/app
COPY yarn.lock /usr/app
COPY .env /usr/app


RUN cd /usr/app

RUN yarn install

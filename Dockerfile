FROM node:dubnium

LABEL MAINTAINER="Moses Gitau <gitaumoses4@gmail.com>"
LABEL APPLICATION="edudoor"

ENV TERM=xterm-256color

WORKDIR /usr/app

RUN npm install -g @nrwl/nx &&  rm -rf package-lock.json

COPY . /usr/app

RUN yarn install

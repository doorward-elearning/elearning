FROM node:dubnium

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g yarn && rm -rf package-lock.json

COPY dist /usr/src/app

RUN node /usr/src/app/index.js

FROM node:dubnium

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g yarn && rm -rf package-lock.json

COPY build /usr/src/app

ENTRYPOINT npm install -g serve

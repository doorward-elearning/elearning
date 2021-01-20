#!/usr/bin/env sh

export NODE_ENV='production';

cd /usr/app/

yarn db:chat:migrate

yarn db:chat:seed

cd /usr/app/dist/apps/doorward-chat-api && node main.js

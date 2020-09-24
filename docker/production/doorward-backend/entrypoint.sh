#!/usr/bin/env sh

export NODE_ENV='production';

cd /usr/app/

yarn db:thala:migrate

yarn db:thala:seed

node /usr/app/dist/apps/doorward-backend/main.js

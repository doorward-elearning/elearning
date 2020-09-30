#!/usr/bin/env sh

export NODE_ENV='production';

cd /usr/app/

yarn db:thala:migrate

yarn db:thala:seed

cd /usr/app/dist/apps/doorward-backend && node main.js

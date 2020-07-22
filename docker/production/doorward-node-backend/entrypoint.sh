#!/usr/bin/env sh

export NODE_ENV='production';

yarn db:migrate

yarn db:seed

# shellcheck disable=SC2164
cd /usr/app/dist/apps/doorward-node-backend

# shellcheck disable=SC2034
node main.js

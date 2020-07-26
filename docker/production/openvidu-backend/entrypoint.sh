#!/usr/bin/env sh

export NODE_ENV='production';

# shellcheck disable=SC2164
cd /usr/app/dist/apps/openvidu-backend

# shellcheck disable=SC2034
node main.js

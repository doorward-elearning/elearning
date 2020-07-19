#!/usr/bin/env bash
yarn install

export NODE_ENV=development

printf "\n\n======================================\n"
printf "Starting the application"
printf "\n=======================================\n"

yarn start:dev openvidu-frontend

exit 0

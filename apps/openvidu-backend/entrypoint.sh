#!/usr/bin/env bash
yarn install

export NODE_ENV=development

printf "\n\n======================================\n"
printf "Starting the application"
printf "\n=======================================\n"

yarn start openvidu-backend

exit 0

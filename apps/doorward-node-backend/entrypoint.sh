#!/usr/bin/env bash

printf "\n\n=====================================\n"
printf "Making database migrations"
printf "\n=======================================\n"

yarn install

export NODE_ENV=development
yarn db:migrate
yarn db:seed

printf "\n\n======================================\n"
printf "Starting the application"
printf "\n=======================================\n"

yarn start doorward-node-backend


exit 0

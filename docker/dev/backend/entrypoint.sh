#!/usr/bin/env bash

printf "\n\n=====================================\n"
printf "Making database migrations"
printf "\n=======================================\n"

export NODE_ENV=development
yarn db:migrate
yarn db:seed

printf "\n\n======================================\n"
printf "Starting the application"
printf "\n=======================================\n"

nx serve edudoor-node-backend

exit 0

#!/usr/bin/env bash

printf "\n\n=====================================\n"
printf "Installing dependencies"
printf "\n=======================================\n"

yarn install

export NODE_ENV=development

printf "\n\n======================================\n"
printf "Starting the application"
printf "\n=======================================\n"

yarn start edudoor-frontend

exit 0

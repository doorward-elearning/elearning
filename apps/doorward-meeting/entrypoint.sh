#!/usr/bin/env bash

printf "\n\n=====================================\n"
printf "Installing dependencies"
printf "\n=======================================\n"

yarn install

printf "\n\n======================================\n"
printf "Starting the application"
printf "\n=======================================\n"

yarn start:dev doorward-meeting

exit 0

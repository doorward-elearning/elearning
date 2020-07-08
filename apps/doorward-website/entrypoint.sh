#!/usr/bin/env bash

printf "\n\n=====================================\n"
printf "Installing dependencies"
printf "\n=======================================\n"

yarn install

printf "\n\n======================================\n"
printf "Starting the application"
printf "\n=======================================\n"

yarn start doorward-website

exit 0

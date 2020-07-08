#!/usr/bin/env sh

yarn db:migrate

yarn db:seed

yarn start doorward-node-backend


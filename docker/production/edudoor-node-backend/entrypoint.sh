#!/bin/sh

yarn db:migrate

yarn db:seed

yarn start edudoor-node-backend


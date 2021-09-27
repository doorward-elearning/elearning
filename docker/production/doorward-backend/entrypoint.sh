#!/usr/bin/env sh

export NODE_ENV='production';

cd /usr/app/

# Initialize database for organization information
yarn db:org:migrate
yarn db:org:seed

# Initialize database for organizations
yarn db:thala:migrate
yarn db:thala:seed

cd /usr/app/dist/apps/doorward-backend && node main.js

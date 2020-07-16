#!/usr/bin/env bash

IP_ADDRESS=$(hostname -I | awk '{print $1}')

replacement="s/localhost/${IP_ADDRESS}/g";

sed ${replacement} .envexample > .env

ts-node tools/angular-config.ts

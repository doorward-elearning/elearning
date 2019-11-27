import debug from 'debug';
import dotenv from 'dotenv';
import http from 'http';
import env from './config/environment';
import app from './app';
import models from './database/models';
import LdapClient from './ldap/client';

global.models = models;

dotenv.config();
const logger = debug('log');
const server = http.createServer(app);

console.log(`Starting server on port ${env.PORT}`);

LdapClient.bindClient().then(client => {
  global.ldapClient = client;
  logger('Successfully connected to LDAP');
});

server.listen(env.PORT, '0.0.0.0', 511, () => {
  logger(`Find me on http://localhost:${env.PORT}`);
});

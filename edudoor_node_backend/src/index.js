import debug from 'debug';
import dotenv from 'dotenv';
import http from 'http';
import env from './config/environment';
import app from './app';
import models from './database/models';
import shortid from 'shortid';
import Organization from './utils/Organization';

global.models = models;

dotenv.config();
const logger = debug('log');
const server = http.createServer(app);

console.log(`Starting server on port ${env.PORT}`);

console.log(shortid.generate() + shortid.generate() + shortid.generate());
Organization.get().then(() => {
  logger('Organization initialized.');
});

server.listen(env.PORT, '0.0.0.0', 511, () => {
  logger(`Find me on http://localhost:${env.PORT}`);
});

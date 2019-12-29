import debug from 'debug';
import dotenv from 'dotenv';
import http from 'http';
import shortid from 'shortid';
import socketIO from 'socket.io';
import env from './src/config/environment';
import app from './src/app';
import models from './src/database/models';
import Organization from './src/utils/Organization';
import JWT from './src/utils/auth';

global.models = models;

dotenv.config();
const logger = debug('log');
const server = http.createServer(app);

const io = socketIO(server);

global.socketIO = io;

console.log(`Starting server on port ${env.PORT}`);

console.log(shortid.generate() + shortid.generate() + shortid.generate());
Organization.get().then(() => {
  logger('Organization initialized.');
});

server.listen(env.PORT, '0.0.0.0', 511, () => {
  logger(`Find me on http://localhost:${env.PORT}`);
});

io.on('connection', client => {
  logger(`Socket connection established with ${client.id}`);
  client.on('disconnect', () => logger('Socket disconnected'));

  const { token } = client.handshake.query;

  if (token) {
    JWT.verify(token).then(decoded => {
      const { id } = decoded;
      client.join(id);
    });
  }
});

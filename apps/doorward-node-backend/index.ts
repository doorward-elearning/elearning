import debug from 'debug';
import shortid from 'shortid';
import app from './src/app';
import JWT from './src/utils/auth';
import httpsOptions from '@doorward/backend/bootstrap/httpsOptions';

const https = require('https');
const socketIO = require('socket.io');

const logger = debug('log');
const server = https.createServer(app);
if (process.env.NODE_ENV === 'development') {
  const { key, cert } = httpsOptions;
  server.setSecureContext({ key, cert });
}

const io = socketIO(server);

global.socketIO = io;

console.log(`Starting server on port ${process.env.API_PORT}`);

console.log(shortid.generate() + shortid.generate() + shortid.generate());

server.listen(process.env.API_PORT, '0.0.0.0', 511, () => {
  logger(`Find me on https://localhost:${process.env.API_PORT}`);
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

import debug from 'debug';
import shortid from 'shortid';
import app from './src/app';
import JWT from './src/utils/auth';

const http = require('http');
const socketIO = require('socket.io');

const logger = debug('log');
const server = http.createServer(app);

const io = socketIO(server);

global.socketIO = io;

console.log(`Starting server on port ${process.env.PORT}`);

console.log(shortid.generate() + shortid.generate() + shortid.generate());

server.listen(process.env.PORT, '0.0.0.0', 511, () => {
  logger(`Find me on http://localhost:${process.env.PORT}`);
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

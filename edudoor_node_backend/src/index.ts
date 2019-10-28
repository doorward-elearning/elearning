import debug from 'debug';
import http from 'http';
import environment from './config/environment';
import app from './app';

const dotenv = require('dotenv');

dotenv.config();
const logger = debug('log');
const server = http.createServer(app);

server.listen(environment.PORT, () => {
  logger(`Find me on http://localhost:${environment.PORT}`);
});

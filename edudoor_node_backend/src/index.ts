import debug from 'debug';
import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import environment from './config/environment';

dotenv.config();
const logger = debug('log');
const server = http.createServer(app);

server.listen(env.PORT, () => {
  logger(`Find me on http://localhost:${environment.PORT}`);
});

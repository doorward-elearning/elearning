import { INestApplication, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import socketIO from 'socket.io';

export default class ChatAdapter extends IoAdapter {
  private logger: Logger;

  constructor(private app: INestApplication) {
    super(app);
    this.logger = app.get(Logger);
  }

  createIOServer(port: number, options?: any): socketIO.Server {
    const server = super.createIOServer(port, {}) as socketIO.Server;

    server.on('connection', (client) => {
      this.logger.debug(`Client connection established with id ${client.id}`);
    });

    return server;
  }
}

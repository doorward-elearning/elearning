import { INestApplication, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import socketIO from 'socket.io';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';

export default class ChatAdapter extends IoAdapter {
  private logger: DoorwardLogger;

  constructor(private app: INestApplication) {
    super(app);
    this.logger = new DoorwardLogger();
  }

  createIOServer(port: number, options?: any): socketIO.Server {
    const server = super.createIOServer(port, {}) as socketIO.Server;

    server.on('connection', (client) => {});

    return server;
  }
}

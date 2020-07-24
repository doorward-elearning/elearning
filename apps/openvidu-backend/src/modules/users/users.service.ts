import { Injectable } from '@nestjs/common';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { OpenviduUser } from '@doorward/common/types/openvidu';

@Injectable()
export class UsersService {
  constructor(private openviduService: OpenviduService) {}
  async findOne(connectionId: string, sessionId: string): Promise<OpenviduUser | null> {
    const sessionInfo = await this.openviduService.getSessionInfo(sessionId);

    const connectionInfo = sessionInfo.connections.content.find(connection => connection.connectionId === connectionId);

    if (connectionInfo) {
      return JSON.parse(connectionInfo.clientData) as OpenviduUser;
    }
    return null;
  }
}

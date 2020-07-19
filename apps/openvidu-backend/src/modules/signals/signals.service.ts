import { Injectable } from '@nestjs/common';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { OpenviduUserSession } from '@doorward/common/types/openvidu';

@Injectable()
export class SignalsService {
  constructor(private openviduService: OpenviduService) {}

  public async sendSignal<T>(sessionId: string, type: string, user: OpenviduUserSession, data?: T, to?: Array<string>) {
    const receivers = to || [];
    if (!to) {
      receivers.push(
        ...(await this.openviduService.getAllParticipants(sessionId))
          .filter(conn => !this.openviduService.isMyConnection(conn, user))
          .map(conn => conn.connectionId)
      );
    }
    return this.openviduService.sendSignal(sessionId, type, data, receivers);
  }
}

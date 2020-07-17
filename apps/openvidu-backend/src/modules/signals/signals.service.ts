import { Injectable } from '@nestjs/common';
import { OpenviduService } from '../../services/openvidu/openvidu.service';

@Injectable()
export class SignalsService {
  constructor(private openviduService: OpenviduService) {}

  public async sendSignal<T>(sessionId: string, type: string, data?: T) {
    return this.openviduService.sendSignal(sessionId, type, data);
  }
}

import { Injectable } from '@nestjs/common';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import SignalTypes from './types';

@Injectable()
export class SignalsService {
  constructor(private openviduService: OpenviduService) {}

  public async muteAllParticipants(sessionId: string, permanent = false) {
    return this.openviduService.sendSignal(sessionId, SignalTypes.MUTE_AUDIO, {
      permanent,
    });
  }
}

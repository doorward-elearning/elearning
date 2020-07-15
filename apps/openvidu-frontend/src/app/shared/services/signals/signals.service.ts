import { Injectable } from '@angular/core';
import { OpenViduSessionService } from '../openvidu-session/openvidu-session.service';
import {
  ConnectionEvent,
  EventDispatcher,
  PublisherSpeakingEvent,
  RecordingEvent,
  SessionDisconnectedEvent,
  SignalEvent,
  StreamEvent,
} from 'openvidu-browser';
import SignalTypes from '../../../../../../openvidu-backend/src/modules/signals/types';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  constructor(private openviduService: OpenViduSessionService) {}

  subscribeAll() {
    this.subscribeToMuteAudio();
  }

  subscribeToMuteAudio() {
    this.subscribe(SignalTypes.MUTE_AUDIO, () => {
      this.openviduService.publishWebcamAudio(false);
    });
  }

  private subscribe(
    type: string,
    handler: (
      event:
        | SessionDisconnectedEvent
        | SignalEvent
        | StreamEvent
        | ConnectionEvent
        | PublisherSpeakingEvent
        | RecordingEvent
    ) => void,
    webCam = true
  ): EventDispatcher {
    const session = webCam ? this.openviduService.getWebcamSession() : this.openviduService.getScreenSession();
    if (session) {
      return session.on('signal', event => {
        if (event.type === 'signal:' + type) {
          handler(event);
        }
      });
    }
  }
}

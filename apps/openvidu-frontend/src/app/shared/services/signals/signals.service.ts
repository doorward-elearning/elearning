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
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  constructor(private openviduService: OpenViduSessionService) {}

  subscribeAll() {
    this.subscribeToMuteAudio();
    this.subscribeToMuteVideo();
    this.subscribeToUnmuteAudio();
    this.subscribeToUnmuteVideo();
  }

  subscribeToMuteAudio() {
    this.subscribe(SignalTypes.MUTE_AUDIO, () => {
      this.openviduService.publishWebcamAudio(false);
    });
  }

  subscribeToMuteVideo() {
    this.subscribe(SignalTypes.MUTE_VIDEO, () => {
      this.openviduService.publishVideo(false);
    });
  }

  subscribeToUnmuteAudio() {
    this.subscribe(SignalTypes.UNMUTE_AUDIO, () => {
      this.openviduService.publishWebcamAudio(true);
    });
  }

  subscribeToUnmuteVideo() {
    this.subscribe(SignalTypes.UNMUTE_VIDEO, () => {
      this.openviduService.publishVideo(true);
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

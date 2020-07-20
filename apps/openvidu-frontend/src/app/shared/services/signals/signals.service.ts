import { Injectable } from '@angular/core';
import { OpenViduSessionService } from '../openvidu-session/openvidu-session.service';
import {
  Connection,
  ConnectionEvent,
  EventDispatcher,
  PublisherSpeakingEvent,
  RecordingEvent,
  SessionDisconnectedEvent,
  SignalEvent,
  SignalOptions,
  StreamEvent,
} from 'openvidu-browser';
import SignalTypes, { SignalData } from '@doorward/common/utils/meetingSignalTypes';
import { RemoteUsersService } from '../remote-users/remote-users.service';
import { UserModel } from '../../models/user-model';
import { UtilsService } from '../utils/utils.service';

export type SignalHandler = (event: SignalEvent) => void;

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  remoteUsers: Array<UserModel>;
  localUsers: Array<UserModel>;

  constructor(
    private openviduService: OpenViduSessionService,
    private remoteUsersService: RemoteUsersService,
    private utilsService: UtilsService
  ) {
    this.remoteUsersService.remoteUsers.subscribe(next => {
      this.remoteUsers = [...next];
    });
  }

  subscribeAll() {
    this.subscribeToToggleAudio();
    this.subscribeToToggleVideo();
  }

  subscribeToLeaveSession(handler: SignalHandler) {
    this.subscribe(SignalTypes.LEAVE_MEETING, handler);
  }

  subscribeToToggleAudio() {
    this.subscribe(SignalTypes.TOGGLE_AUDIO, () => {
      this.openviduService.publishWebcamAudio(!this.openviduService.hasWebcamAudioActive());
    });
  }

  subscribeToToggleVideo() {
    this.subscribe(SignalTypes.TOGGLE_VIDEO, event => {
      if (this.openviduService.hasWebcamVideoActive()) {
        this.openviduService.publishVideo(false);
      } else {
        this.utilsService.alert(
          'Turn on video',
          `${this.remoteUsersService
            .getRemoteUserByConnectionId(event.from.connectionId)
            .getNickname()} is requesting you to turn on your video`,
          [
            {
              text: 'Not now',
              onClick: () => {},
            },
            {
              text: 'Turn on',
              onClick: () => {
                this.openviduService.publishVideo(true);
              },
            },
          ]
        );
      }
    });
  }

  send<T extends SignalTypes>(type: T, data: SignalData[T], to?: Array<UserModel>) {
    const session = this.openviduService.getWebcamSession();
    const participants = to || [];
    if (!to) {
      participants.push(...this.remoteUsers);
    }
    if (session) {
      const signalOptions: SignalOptions = {
        data: JSON.stringify(data),
        type: type,
        to: participants.map(participant => participant.streamManager?.stream?.connection).filter(conn => !!conn),
      };
      return session.signal(signalOptions);
    }
  }

  private subscribe(type: string, handler: SignalHandler, webCam = true): EventDispatcher {
    const session = webCam ? this.openviduService.getWebcamSession() : this.openviduService.getScreenSession();
    if (session) {
      return session.on('signal:' + type, event => {
        handler(event);
      });
    }
  }
}

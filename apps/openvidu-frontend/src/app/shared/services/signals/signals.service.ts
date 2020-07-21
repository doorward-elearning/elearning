import { Injectable } from '@angular/core';
import { OpenViduSessionService } from '../openvidu-session/openvidu-session.service';
import { EventDispatcher, SignalEvent, SignalOptions } from 'openvidu-browser';
import SignalTypes, { SignalData } from '@doorward/common/utils/meetingSignalTypes';
import { RemoteUsersService } from '../remote-users/remote-users.service';
import { UserModel } from '../../models/user-model';
import { UtilsService } from '../utils/utils.service';
import Capabilities from '@doorward/common/utils/Capabilities';
import { MeetingCapabilities } from '@doorward/common/types/meetinCapabilities';

export type SignalHandler<T extends SignalTypes> = (data: SignalData[T], event: SignalEvent) => void;

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
    this.subscribeToLocalUserUpdate();
    this.subscribeToRemoteUsersDetails();
    this.subscribeToVideoControl();
  }

  subscribeToVideoControl() {
    this.subscribe(SignalTypes.TOGGLE_VIDEO_CONTROL, () => {
      this.openviduService.updateLocalUserSession(user => {
        user.sessionConfig.capabilities.toggle(MeetingCapabilities.PUBLISH_VIDEO);
        return user;
      });
    });
  }

  subscribeToLeaveSession(handler: SignalHandler<SignalTypes.LEAVE_MEETING>) {
    this.subscribe(SignalTypes.LEAVE_MEETING, handler);
  }

  subscribeToToggleAudio() {
    this.subscribe(SignalTypes.TOGGLE_AUDIO, () => {
      this.openviduService.publishWebcamAudio(!this.openviduService.hasWebcamAudioActive());
    });
  }

  subscribeToRemoteUsersDetails() {
    this.subscribe(SignalTypes.USER_UPDATED, (data, event) => {
      const userModel = this.remoteUsersService.getRemoteUserByConnectionId(event.from.connectionId);
      if (userModel) {
        userModel.session = data.session;
        this.remoteUsersService.updateUsers();
      }
    });
  }

  subscribeToLocalUserUpdate() {
    this.openviduService.getUsers().subscribe(next => {
      next.forEach(user => {
        this.send(SignalTypes.USER_UPDATED, {
          session: user.session,
        });
      });
    });
  }

  subscribeToToggleVideo() {
    this.subscribe(SignalTypes.TOGGLE_VIDEO, (data, event) => {
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

  subscribe<T extends SignalTypes>(type: T, handler: SignalHandler<T>, webCam = true): EventDispatcher {
    const session = webCam ? this.openviduService.getWebcamSession() : this.openviduService.getScreenSession();
    if (session) {
      return session.on('signal:' + type, (event: SignalEvent) => {
        try {
          handler(event.data ? JSON.parse(event.data) : undefined, event);
        } catch (error) {
          handler(undefined, event);
        }
      });
    }
  }
}

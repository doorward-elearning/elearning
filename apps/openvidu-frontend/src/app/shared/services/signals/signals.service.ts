import { Injectable } from '@angular/core';
import { OpenViduSessionService } from '../openvidu-session/openvidu-session.service';
import { EventDispatcher, SignalEvent, SignalOptions } from 'openvidu-browser';
import SignalTypes, { SignalData } from '@doorward/common/utils/meetingSignalTypes';
import { RemoteUsersService } from '../remote-users/remote-users.service';
import { UserModel } from '../../models/user-model';
import { UtilsService } from '../utils/utils.service';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import { LocalUserModel } from '../../models/local-user-model';
import { NotificationService } from '../notifications/notification.service';
import { RemoteUserModel } from '../../models/remote-user-model';

export type SignalHandler<T extends SignalTypes> = (
  data: SignalData[T],
  event: SignalEvent,
  user: RemoteUserModel
) => void;

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  remoteUsers: Array<UserModel>;
  localUser: LocalUserModel;

  constructor(
    private openviduService: OpenViduSessionService,
    private remoteUsersService: RemoteUsersService,
    private utilsService: UtilsService,
    private notificationService: NotificationService
  ) {
    this.remoteUsersService.remoteUsers.subscribe(next => {
      this.remoteUsers = [...next];
    });
    this.openviduService.userObs.subscribe(user => {
      this.localUser = user;
    });
  }

  subscribeAll() {
    this.subscribeToToggleAudio();
    this.subscribeToToggleVideo();
    this.subscribeToLocalUserUpdate();
    this.subscribeToRemoteUsersDetails();
    this.subscribeToVideoControl();
    this._subscribeToRaisingHands();
  }

  private _subscribeToRaisingHands() {
    this.subscribe(SignalTypes.RAISE_HAND, (data, event, user) => {
      this.notificationService.newMessage({
        sender: user.getOVSession()?.user,
        message: '✋ is raising their hand.',
        onClick: () => {},
        duration: 1000,
      });
    });
  }

  subscribeToVideoControl() {
    this.subscribe(SignalTypes.TOGGLE_VIDEO_CONTROL, () => {
      this.openviduService.updateLocalUserSession(user => {
        user.toggleCapability(MeetingCapabilities.PUBLISH_VIDEO);
        return user;
      });
    });
  }

  subscribeToLeaveSession(handler: SignalHandler<SignalTypes.LEAVE_MEETING>) {
    this.subscribe(SignalTypes.LEAVE_MEETING, handler);
  }

  subscribeToToggleAudio() {
    this.subscribe(SignalTypes.TOGGLE_AUDIO, (data, event) => {
      const active = this.openviduService.getUser().isAudioActive();
      if (data.request) {
        const title = active ? 'Mute' : 'Unmute';
        const message = active
          ? 'is requesting you to turn off your microphone'
          : 'is requesting you to turn on your microphone.';
        const button = active ? 'Turn off' : 'Turn on';
        this.utilsService.alert(
          title,
          `${this.remoteUsersService.getRemoteUserByConnectionId(event.from.connectionId).getNickname()} ${message}`,
          [
            {
              text: 'Not now',
              onClick: () => {},
            },
            {
              text: button,
              onClick: () => {
                this.openviduService.publishWebcamAudio(!active);
                this.openviduService.updateLocalUserSession(user => {
                  user.addCapability(MeetingCapabilities.PUBLISH_AUDIO);
                  return user;
                });
              },
            },
          ]
        );
      } else {
        this.openviduService.publishWebcamAudio(!active);
      }
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
    this.openviduService.userObs.subscribe(user => {
      this.send(SignalTypes.USER_UPDATED, {
        session: user.session,
      });
    });
  }

  subscribeToToggleVideo() {
    this.subscribe(SignalTypes.TOGGLE_VIDEO, (data, event) => {
      const active = this.openviduService.getUser().isVideoActive();
      if (data.request) {
        const title = active ? 'Turn off video' : 'Turn on video';
        const message = active
          ? 'is requesting you to turn off your video'
          : 'is requesting you to turn on your video.';
        const button = active ? 'Turn off' : 'Turn on';
        this.utilsService.alert(
          title,
          `${this.remoteUsersService.getRemoteUserByConnectionId(event.from.connectionId).getNickname()} ${message}`,
          [
            {
              text: 'Not now',
              onClick: () => {},
            },
            {
              text: button,
              onClick: () => {
                this.openviduService.publishWebcam(!active);
                this.openviduService.updateLocalUserSession(user => {
                  user.addCapability(MeetingCapabilities.PUBLISH_VIDEO);
                  return user;
                });
              },
            },
          ]
        );
      } else {
        this.openviduService.publishWebcam(!active);
      }
    });
  }

  send<T extends SignalTypes>(type: T, data?: SignalData[T], to?: Array<UserModel>) {
    const connection = this.localUser.getActiveSession();
    const session = connection.getSession();
    const participants = to || [];
    if (!to) {
      participants.push(...this.remoteUsers);
    }
    if (session) {
      const signalOptions: SignalOptions = {
        data: JSON.stringify(data),
        type: type,
        to: participants
          .filter(participant => !!participant)
          .map(participant => participant.getActiveSession().getStream()?.connection)
          .filter(conn => !!conn),
      };
      return session.signal(signalOptions);
    }
  }

  subscribe<T extends SignalTypes>(type: T, handler: SignalHandler<T>): EventDispatcher {
    const session = this.localUser.getActiveSession().getSession();
    if (session) {
      return session.on('signal:' + type, (event: SignalEvent) => {
        const from = event.from.connectionId;
        const user = this.remoteUsersService.getRemoteUserByConnectionId(from);
        try {
          handler(event.data ? JSON.parse(event.data) : undefined, event, user);
        } catch (error) {
          handler(undefined, event, user);
        }
      });
    }
  }
}

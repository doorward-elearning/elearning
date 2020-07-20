import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  Connection,
  Publisher,
  PublisherSpeakingEvent,
  Session,
  SessionDisconnectedEvent,
  SignalOptions,
  StreamEvent,
  StreamPropertyChangedEvent,
  Subscriber,
} from 'openvidu-browser';
import { OpenViduLayout, OpenViduLayoutOptions } from '../shared/layout/openvidu-layout';
import { UserModel } from '../shared/models/user-model';
import { ChatComponent } from '../shared/components/chat/chat.component';
import { OvSettingsModel } from '../shared/models/ovSettings';
import { ScreenType } from '../shared/types/video-type';
import { ILogger } from '../shared/types/logger-type';
import { LayoutType } from '../shared/types/layout-type';
import { ExternalConfigModel } from '../shared/models/external-config';
// Services
import { DevicesService } from '../shared/services/devices/devices.service';
import { OpenViduSessionService } from '../shared/services/openvidu-session/openvidu-session.service';
import { NetworkService } from '../shared/services/network/network.service';
import { LoggerService } from '../shared/services/logger/logger.service';
import { RemoteUsersService } from '../shared/services/remote-users/remote-users.service';
import { UtilsService } from '../shared/services/utils/utils.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ChatService } from '../shared/services/chat/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEndMeetingComponent } from '../shared/components/dialog-end-meeting/dialog-end-meeting.component';
import { SignalsService } from '../shared/services/signals/signals.service';
import { OPENVIDU_ROLES, OpenviduTheme, OpenviduUserSession } from '@doorward/common/types/openvidu';
import { environment } from '../../environments/environment';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';

@Component({
  selector: 'app-video-room',
  templateUrl: './video-room.component.html',
  styleUrls: ['./video-room.component.css'],
})
export class VideoRoomComponent implements OnInit, OnDestroy {
  // Config from webcomponent or angular-library
  @Input() externalConfig: ExternalConfigModel;
  @Output() _session = new EventEmitter<any>();
  @Output() _publisher = new EventEmitter<any>();
  @Output() _error = new EventEmitter<any>();

  // !Deprecated
  @Output() _joinSession = new EventEmitter<any>();
  // !Deprecated</participants-list>
  @Output() _leaveSession = new EventEmitter<any>();

  @ViewChild('chatComponent') chatComponent: ChatComponent;
  @ViewChild('sidenav') chatSidenav: MatSidenav;

  ovSettings: OvSettingsModel;
  compact = false;
  sidenavMode: 'side' | 'over' = 'side';
  sidenavContent: 'chat' | 'participants' | null = null;
  lightTheme: boolean;
  showConfigRoomCard = true;
  session: Session;
  sessionScreen: Session;
  openviduLayout: OpenViduLayout;
  openviduLayoutOptions: OpenViduLayoutOptions;
  mySessionId: string;
  localUsers: UserModel[] = [];
  remoteUsers: UserModel[] = [];
  isConnectionLost: boolean;
  isAutoLayout = false;
  hasVideoDevices: boolean;
  hasAudioDevices: boolean;
  private log: ILogger;
  private oVUsersSubscription: Subscription;
  private remoteUsersSubscription: Subscription;
  private chatSubscription: Subscription;

  constructor(
    private networkSrv: NetworkService,
    private router: Router,
    private utilsSrv: UtilsService,
    private remoteUsersService: RemoteUsersService,
    public oVSessionService: OpenViduSessionService,
    private oVDevicesService: DevicesService,
    private loggerSrv: LoggerService,
    private chatService: ChatService,
    private matDialog: MatDialog,
    private signalService: SignalsService
  ) {
    this.log = this.loggerSrv.get('VideoRoomComponent');
  }

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    this.leaveSession();
  }

  @HostListener('window:resize')
  sizeChange() {
    if (this.openviduLayout) {
      this.updateOpenViduLayout();
      this.checkSizeComponent();
    }
  }

  async ngOnInit() {
    const defaultConfig = new ExternalConfigModel();
    defaultConfig.user = {
      name: this.utilsSrv.generateNickname(),
      role: this.utilsSrv.isFF() ? OPENVIDU_ROLES.PUBLISHER : OPENVIDU_ROLES.MODERATOR,
      avatar:
        Math.random() * 1000 > 500
          ? 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          : null,
    };
    defaultConfig.sessionId = 'test-meeting';
    if (!this.externalConfig) {
      this.externalConfig = defaultConfig;
      this._leaveSession.subscribe(() => {
        this.router.navigate(['']);
      });
    }
    this.lightTheme = this.externalConfig.theme === OpenviduTheme.LIGHT;
    this.ovSettings = this.externalConfig.ovSettings || new OvSettingsModel();
    this.ovSettings.setScreenSharing(this.ovSettings.hasScreenSharing() && !this.utilsSrv.isMobile());
    this.oVSessionService.setWebcamAvatar(this.externalConfig.user.avatar);

    if (this.externalConfig.ovServerApiUrl) {
      environment.OPENVIDU_API_URL = this.externalConfig.ovServerApiUrl;
    }
    this.utilsSrv.setTheme(this.externalConfig.theme);
    this.utilsSrv.subscribeToThemeChangeShortcut();
    if (!this.showConfigRoomCard) {
      this.onConfigRoomJoin();
    }
  }

  ngOnDestroy() {
    // Reconnecting session is received in Firefox
    // To avoid 'Connection lost' message uses session.off()
    this.session?.off('reconnecting');
    this.remoteUsersService.clean();
    this.session = null;
    this.sessionScreen = null;
    this.localUsers = [];
    this.remoteUsers = [];
    this.openviduLayout = null;
    if (this.oVUsersSubscription) {
      this.oVUsersSubscription.unsubscribe();
    }
    if (this.remoteUsersSubscription) {
      this.remoteUsersSubscription.unsubscribe();
    }
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    this.utilsSrv.unsubscribeFromThemeChangeShortcut();
  }

  onConfigRoomJoin() {
    this.hasVideoDevices = this.oVDevicesService.hasVideoDeviceAvailable();
    this.hasAudioDevices = this.oVDevicesService.hasAudioDeviceAvailable();
    this.showConfigRoomCard = false;
    this.subscribeToLocalUsers();
    this.subscribeToRemoteUsers();
    this.mySessionId = this.oVSessionService.getSessionId();

    setTimeout(() => {
      this.openviduLayout = new OpenViduLayout();
      this.openviduLayoutOptions = this.utilsSrv.getOpenviduLayoutOptions();
      this.openviduLayout.initLayoutContainer(document.getElementById('layout'), this.openviduLayoutOptions);
      this.checkSizeComponent();
      this.joinToSession();
    }, 50);
  }

  joinToSession() {
    this.oVSessionService.initSessions();
    this.session = this.oVSessionService.getWebcamSession();
    this._session.emit(this.session);
    this.sessionScreen = this.oVSessionService.getScreenSession();
    this.subscribeToStreamCreated();
    this.subscribeToStreamDestroyed();
    this.subscribeToStreamPropertyChange();
    this.subscribeToNicknameChanged();
    this.chatService.setChatComponent(this.chatSidenav);
    this.chatService.subscribeToChat();
    this.subscribeToChatComponent();
    this.subscribeToReconnection();
    this.connectToSession();
    this.signalService.subscribeAll();
    this.signalService.subscribeToLeaveSession(() => {
      this.oVSessionService.disconnect();
      this._leaveSession.emit();
    });
  }

  leaveSession(showDialog = false) {
    this.log.d('Leaving session...');
    if (showDialog) {
      const result = this.matDialog.open(DialogEndMeetingComponent, {
        data: {
          isSubscriber: false,
        },
      });
      result
        .afterClosed()
        .toPromise()
        .then(dialogResult => {
          if (dialogResult.meetingEnded) {
            this.signalService.send(SignalTypes.LEAVE_MEETING, undefined).then(() => {
              this.oVSessionService.disconnect();
              this._leaveSession.emit();
            });
          }
          if (dialogResult.meetingLeft) {
            this.oVSessionService.disconnect();
            this._leaveSession.emit();
          }
        });
    } else {
      this.oVSessionService.disconnect();
      this._leaveSession.emit();
    }
  }

  onNicknameUpdate(nickname: string) {
    this.oVSessionService.setWebcamName(nickname);
    this.sendNicknameSignal(nickname);
  }

  toggleMic() {
    if (!this.hasAudioDevices) {
      this.utilsSrv.showErrorMessage(
        "Can't find your microphone",
        'Check that your microphone is available. If not, plug one in.'
      );
      return;
    }
    if (this.oVSessionService.isWebCamEnabled()) {
      this.oVSessionService.publishWebcamAudio(!this.oVSessionService.hasWebcamAudioActive());
      return;
    }
    this.oVSessionService.publishScreenAudio(!this.oVSessionService.hasScreenAudioActive());
  }

  toggleNav(content) {
    if (!(content !== this.sidenavContent && this.sidenavContent)) {
      this.chatSidenav.toggle().then(() => {
        if (!this.chatSidenav.opened) {
          this.sidenavContent = null;
        }
      });
    }
    this.sidenavContent = content;
    this.chatService.toggleChat(content === 'chat');
  }

  async toggleCam() {
    if (!this.hasVideoDevices) {
      this.utilsSrv.showErrorMessage(
        "Can't find your camera",
        'Check that your camera is available. If not, plug one in.'
      );
      return;
    }
    const isVideoActive = !this.oVSessionService.hasWebcamVideoActive();

    // Disabling webcam
    if (this.oVSessionService.areBothConnected()) {
      this.oVSessionService.publishVideo(isVideoActive);
      this.oVSessionService.disableWebcamUser();
      this.oVSessionService.unpublishWebcam();
      return;
    }
    // Enabling webcam
    if (this.oVSessionService.isOnlyScreenConnected()) {
      const hasAudio = this.oVSessionService.hasScreenAudioActive();

      await this.oVSessionService.publishWebcam();
      this.oVSessionService.publishScreenAudio(false);
      this.oVSessionService.publishWebcamAudio(hasAudio);
      this.oVSessionService.enableWebcamUser();
    }
    // Muting/unmuting webcam
    this.oVSessionService.publishVideo(isVideoActive);
  }

  async toggleScreenShare() {
    // Disabling screenShare
    if (this.oVSessionService.areBothConnected()) {
      this.removeScreen();
      return;
    }

    // Enabling screenShare
    if (this.oVSessionService.isOnlyWebcamConnected()) {
      const screenPublisher = this.initScreenPublisher();

      screenPublisher.once('accessAllowed', event => {
        // Listen to event fired when native stop button is clicked
        screenPublisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .addEventListener('ended', () => {
            this.log.d('Clicked native stop button. Stopping screen sharing');
            this.toggleScreenShare();
          });
        this.log.d('ACCESS ALOWED screenPublisher');
        this.oVSessionService.enableScreenUser(screenPublisher);
        this.oVSessionService.publishScreen();
        if (!this.oVSessionService.hasWebcamVideoActive()) {
          // Disabling webcam
          this.oVSessionService.disableWebcamUser();
          this.oVSessionService.unpublishWebcam();
        }
      });

      screenPublisher.once('accessDenied', event => {
        this.log.w('ScreenShare: Access Denied');
      });

      return;
    }

    // Disabling screnShare and enabling webcam
    const hasAudio = this.oVSessionService.hasScreenAudioActive();
    await this.oVSessionService.publishWebcam();
    this.oVSessionService.publishScreenAudio(false);
    this.oVSessionService.publishWebcamAudio(hasAudio);
    this.oVSessionService.enableWebcamUser();
    this.removeScreen();
  }

  toggleSpeakerLayout() {
    if (!this.oVSessionService.isScreenShareEnabled()) {
      this.isAutoLayout = !this.isAutoLayout;

      this.log.d('Automatic Layout ', this.isAutoLayout ? 'Disabled' : 'Enabled');
      if (this.isAutoLayout) {
        this.subscribeToSpeachDetection();
        return;
      }
      this.log.d('Unsubscribe to speach detection');
      this.session.off('publisherStartSpeaking');
      this.resetAllBigElements();
      this.updateOpenViduLayout();
      return;
    }
    this.log.w('Screen is enabled. Speach detection has been rejected');
  }

  onReplaceScreenTrack(event) {
    this.oVSessionService.replaceScreenTrack();
  }

  checkSizeComponent() {
    this.compact = document.getElementById('room-container')?.offsetWidth <= 790;
    this.sidenavMode = this.compact ? 'over' : 'side';
  }

  onToggleVideoSize(event: { element: HTMLElement; connectionId?: string; resetAll?: boolean }) {
    const element = event.element;
    if (event.resetAll) {
      this.resetAllBigElements();
    }

    this.utilsSrv.toggleBigElementClass(element);

    // Has been mandatory change the user zoom property here because of
    // zoom icons and cannot handle publisherStartSpeaking event in other component
    if (event?.connectionId) {
      if (this.oVSessionService.isMyOwnConnection(event.connectionId)) {
        this.oVSessionService.toggleZoom(event.connectionId);
      } else {
        this.remoteUsersService.toggleUserZoom(event.connectionId);
      }
    }
    this.updateOpenViduLayout();
  }

  toolbarMicIconEnabled(): boolean {
    if (this.oVSessionService.isWebCamEnabled()) {
      return this.oVSessionService.hasWebcamAudioActive();
    }
    return this.oVSessionService.hasScreenAudioActive();
  }

  private async connectToSession(): Promise<void> {
    let screenToken: string;
    const userSession = await this.initializeSession();
    const webcamToken = userSession.sessionInfo.webcamToken;
    if (!screenToken && this.ovSettings?.hasScreenSharing()) {
      screenToken = userSession.sessionInfo.screenToken;
    }

    if (webcamToken || screenToken) {
      await this.connectBothSessions(webcamToken, screenToken);

      if (this.oVSessionService.areBothConnected()) {
        this.oVSessionService.publishWebcam();
        this.oVSessionService.publishScreen();
      } else if (this.oVSessionService.isOnlyScreenConnected()) {
        this.oVSessionService.publishScreen();
      } else {
        this.oVSessionService.publishWebcam();
      }
      // !Deprecated
      this._joinSession.emit();

      this.updateOpenViduLayout();
    }
  }

  private async connectBothSessions(webcamToken: string, screenToken: string) {
    try {
      await this.oVSessionService.connectWebcamSession(webcamToken, this.externalConfig.user.role);
      await this.oVSessionService.connectScreenSession(screenToken, this.externalConfig.user.role);

      this.localUsers[0].getStreamManager().on('streamPlaying', () => {
        this.localUsers[0].getStreamManager().videos[0].video.parentElement.classList.remove('custom-class');
      });
    } catch (error) {
      this._error.emit({ error: error.error, message: error.message, code: error.code, status: error.status });
      this.log.e('There was an error connecting to the session:', error.code, error.message);
      this.utilsSrv.showErrorMessage('There was an error connecting to the session:', error?.error || error?.message);
    }
  }

  private subscribeToStreamCreated() {
    this.session.on('streamCreated', (event: StreamEvent) => {
      const connectionId = event.stream.connection.connectionId;

      if (this.oVSessionService.isMyOwnConnection(connectionId)) {
        return;
      }

      const subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
      this.remoteUsersService.add(event, subscriber);
      this.sendNicknameSignal(this.oVSessionService.getWebcamUserName(), event.stream.connection);
    });
  }

  private subscribeToStreamDestroyed() {
    this.session.on('streamDestroyed', (event: StreamEvent) => {
      const connectionId = event.stream.connection.connectionId;
      this.remoteUsersService.removeUserByConnectionId(connectionId);
      // event.preventDefault();
    });
  }

  // Emit publisher to webcomponent
  emitPublisher(publisher: Publisher) {
    this._publisher.emit(publisher);
  }

  private subscribeToStreamPropertyChange() {
    this.session.on('streamPropertyChanged', (event: StreamPropertyChangedEvent) => {
      const connectionId = event.stream.connection.connectionId;
      if (this.oVSessionService.isMyOwnConnection(connectionId)) {
        return;
      }
      if (event.changedProperty === 'videoActive') {
        this.remoteUsersService.updateUsers();
      }
    });
  }

  private subscribeToNicknameChanged() {
    this.session.on('signal:nicknameChanged', (event: any) => {
      const connectionId = event.from.connectionId;
      if (this.oVSessionService.isMyOwnConnection(connectionId)) {
        return;
      }
      const nickname = JSON.parse(event.data).nickname;
      this.remoteUsersService.updateNickname(connectionId, nickname);
    });
  }

  private subscribeToSpeachDetection() {
    this.log.d('Subscribe to speech detection', this.session);
    // Has been mandatory change the user zoom property here because of
    // zoom icons and cannot handle publisherStartSpeaking event in other component
    this.session.on('publisherStartSpeaking', (event: PublisherSpeakingEvent) => {
      const someoneIsSharingScreen = this.remoteUsersService.someoneIsSharingScreen();
      if (!this.oVSessionService.isScreenShareEnabled() && !someoneIsSharingScreen) {
        const elem = event.connection.stream.streamManager.videos[0].video;
        const element = this.utilsSrv.getHTMLElementByClassName(elem, LayoutType.ROOT_CLASS);
        this.resetAllBigElements();
        this.remoteUsersService.setUserZoom(event.connection.connectionId, true);
        this.onToggleVideoSize({ element });
      }
    });
  }

  private removeScreen() {
    this.oVSessionService.disableScreenUser();
    this.oVSessionService.unpublishScreen();
  }

  private subscribeToChatComponent() {
    this.chatSubscription = this.chatService.toggleChatObs.subscribe(opened => {
      const timeout = this.externalConfig ? 300 : 0;
      this.updateOpenViduLayout(timeout);
    });
  }

  private subscribeToReconnection() {
    this.session.on('reconnecting', () => {
      this.log.w('Connection lost: Reconnecting');
      this.isConnectionLost = true;
      this.utilsSrv.showErrorMessage('Connection Problem', 'Oops! Trying to reconnect to the session ...', true);
    });
    this.session.on('reconnected', () => {
      this.log.w('Connection lost: Reconnected');
      this.isConnectionLost = false;
      this.utilsSrv.closeDialog();
    });
    this.session.on('sessionDisconnected', (event: SessionDisconnectedEvent) => {
      if (event.reason === 'networkDisconnect') {
        this.utilsSrv.closeDialog();
        this.leaveSession();
      }
    });
  }

  private initScreenPublisher(): Publisher {
    const videoSource = ScreenType.SCREEN;
    const willThereBeWebcam = this.oVSessionService.isWebCamEnabled() && this.oVSessionService.hasWebcamVideoActive();
    const hasAudio = willThereBeWebcam ? false : this.oVSessionService.hasWebcamAudioActive();
    const properties = this.oVSessionService.createProperties(videoSource, undefined, true, hasAudio, false);

    try {
      return this.oVSessionService.initScreenPublisher(undefined, properties);
    } catch (error) {
      this.log.e(error);
      this.utilsSrv.handlerScreenShareError(error);
    }
  }

  private async initializeSession(): Promise<OpenviduUserSession> {
    this.log.d('Generating tokens...', this.mySessionId);
    try {
      return await this.networkSrv.getToken(this.mySessionId, {
        ...this.externalConfig.user,
      });
    } catch (error) {
      this._error.emit({ error: error.error, messgae: error.message, code: error.code, status: error.status });
      this.log.e('There was an error getting the token:', error.status, error.message);
      this.utilsSrv.showErrorMessage('There was an error getting the token:', error.error || error.message);
    }
  }

  private sendNicknameSignal(nickname: string, connection?: Connection) {
    const signalOptions: SignalOptions = {
      data: JSON.stringify({ nickname }),
      type: 'nicknameChanged',
      to: connection ? [connection] : undefined,
    };
    this.session.signal(signalOptions);
  }

  private updateOpenViduLayout(timeout?: number) {
    if (this.openviduLayout) {
      if (!timeout) {
        this.openviduLayout.updateLayout();
        return;
      }
      setTimeout(() => {
        this.openviduLayout.updateLayout();
      }, timeout);
    }
  }

  private resetAllBigElements() {
    this.utilsSrv.removeAllBigElementClass();
    this.remoteUsersService.resetUsersZoom();
    this.oVSessionService.resetUsersZoom();
  }

  private subscribeToLocalUsers() {
    this.oVUsersSubscription = this.oVSessionService.OVUsers.subscribe(users => {
      this.localUsers = users;
      this.updateOpenViduLayout();
    });
  }

  private subscribeToRemoteUsers() {
    this.remoteUsersSubscription = this.remoteUsersService.remoteUsers.subscribe(users => {
      this.remoteUsers = [...users];
      this.updateOpenViduLayout();
    });
  }

  toggleEveryoneMic() {
    this.signalService.send(SignalTypes.TOGGLE_AUDIO, { permanent: false });
  }

  toggleEveryoneVideo() {
    this.signalService.send(SignalTypes.TOGGLE_VIDEO, { permanent: false });
  }

  getLocalUser() {
    return this.localUsers.find(user => user.isCamera());
  }
}

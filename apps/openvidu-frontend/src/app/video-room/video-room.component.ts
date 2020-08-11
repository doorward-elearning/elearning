import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
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
import { OvSettingsModel } from '../shared/models/ovSettings';
import { ScreenType, VideoType } from '../shared/types/video-type';
import { ILogger } from '../shared/types/logger-type';
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
import {
  MeetingCapabilitiesComponent,
  OPENVIDU_ROLES,
  OpenviduTheme,
  OpenviduUserSession,
  WhiteboardSessionInfo,
} from '@doorward/common/types/openvidu';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import { LocalUserModel } from '../shared/models/local-user-model';
import { RemoteUserModel } from '../shared/models/remote-user-model';
import { CanvasWhiteboardComponent } from '@doorward/whiteboard/ng2-canvas-whiteboard';
import { WhiteboardSyncService } from '../shared/services/whiteboard/whiteboard-sync.service';
import {
  CANVAS_WHITEBOARD_SYNC_SERVICE,
  CanvasWhiteboardUpdateTypes,
} from '@doorward/whiteboard/canvas-whiteboard-sync.service';
import { QuestionsAnswersService } from '../shared/components/questions-answers/questions-answers.service';

export enum SideNavComponents {
  CHAT = 'CHAT',
  PARTICIPANTS = 'PARTICIPANTS',
  QUESTIONS_AND_ANSWERS = 'QUESTIONS_AND_ANSWERS',
}

@Component({
  selector: 'app-video-room',
  templateUrl: './video-room.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./video-room.component.scss'],
})
export class VideoRoomComponent extends MeetingCapabilitiesComponent implements OnInit, OnDestroy {
  // Config from webcomponent or angular-library
  @Input() externalConfig: ExternalConfigModel;
  @Output() _session = new EventEmitter<any>();
  @Output() _publisher = new EventEmitter<any>();
  @Output() _error = new EventEmitter<any>();

  // !Deprecated
  @Output() _joinSession = new EventEmitter<any>();
  // !Deprecated</participants-list>
  @Output() _leaveSession = new EventEmitter<any>();

  @ViewChild('sidenav') chatSidenav: MatSidenav;

  ovSettings: OvSettingsModel;
  compact = false;
  sidenavMode: 'side' | 'over' = 'side';
  lightTheme: boolean;
  session: Session;
  sessionScreen: Session;
  openviduLayout: OpenViduLayout;
  openviduLayoutOptions: OpenViduLayoutOptions;
  mySessionId: string;
  localUser: LocalUserModel;
  remoteUsers: RemoteUserModel[] = [];
  isConnectionLost: boolean;
  isAutoLayout = false;
  hasVideoDevices: boolean;
  hasAudioDevices: boolean;
  whiteboardShown: boolean;
  isFullSize = false;
  private log: ILogger;
  private oVUsersSubscription: Subscription;
  private remoteUsersSubscription: Subscription;
  private sideNavSubscription: Subscription;

  @ViewChild('canvasWhiteboard') whiteboardCanvas: CanvasWhiteboardComponent;

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
    private signalService: SignalsService,
    private qaService: QuestionsAnswersService,
    @Inject(CANVAS_WHITEBOARD_SYNC_SERVICE) private whiteboardService: WhiteboardSyncService,
    @Inject('BASE_API_URL') private _baseUrl: BehaviorSubject<string>
  ) {
    super();
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
    if (!this.externalConfig) {
      const defaultConfig = new ExternalConfigModel();
      defaultConfig.user = {
        name: this.utilsSrv.generateNickname(),
        role: OPENVIDU_ROLES.MODERATOR,
        avatar:
          Math.random() * 1000 > 500
            ? 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            : null,
      };
      defaultConfig.sessionId = 'test-meeting';
      // if (this.utilsSrv.isTestClientBrowser()) {
      //   defaultConfig.user.role = OPENVIDU_ROLES.PUBLISHER;
      //   defaultConfig.sessionConfig.capabilities.remove(
      //     MeetingCapabilities.PUBLISH_VIDEO,
      //     MeetingCapabilities.PUBLISH_WHITEBOARD,
      //     MeetingCapabilities.ASK_QUESTIONS
      //   );
      // }
      this.externalConfig = defaultConfig;
      this._leaveSession.subscribe(() => {
        this.router.navigate(['']);
      });
    }
    this.lightTheme = this.externalConfig.theme === OpenviduTheme.LIGHT;
    this.ovSettings = this.externalConfig.ovSettings || new OvSettingsModel();
    this.ovSettings.setScreenSharing(this.ovSettings.hasScreenSharing() && !this.utilsSrv.isMobile());
    this.mySessionId = this.externalConfig.sessionId;

    if (this.externalConfig.ovServerApiUrl) {
      this._baseUrl.next(this.externalConfig.ovServerApiUrl);
    }
    this.utilsSrv.setTheme(this.externalConfig.theme);
    this.utilsSrv.subscribeToThemeChangeShortcut();
    const userSession = {
      user: this.externalConfig.user,
      sessionConfig: this.externalConfig.sessionConfig,
      sessionInfo: this.externalConfig.sessionInfo,
    };
    this.oVSessionService.setLocalUserSession(userSession);
    this.oVSessionService.setSessionTitle(this.externalConfig.sessionTitle || this.externalConfig.sessionId);
  }

  ngOnDestroy() {
    // Reconnecting session is received in Firefox
    // To avoid 'Connection lost' message uses session.off()
    this.session?.off('reconnecting');
    this.remoteUsersService.clean();
    this.session = null;
    this.sessionScreen = null;
    this.localUser = null;
    this.remoteUsers = [];
    this.openviduLayout = null;
    if (this.oVUsersSubscription) {
      this.oVUsersSubscription.unsubscribe();
    }
    if (this.remoteUsersSubscription) {
      this.remoteUsersSubscription.unsubscribe();
    }
    if (this.sideNavSubscription) {
      this.sideNavSubscription.unsubscribe();
    }
    this.utilsSrv.unsubscribeFromThemeChangeShortcut();
  }

  onConfigRoomJoin() {
    this.hasVideoDevices = this.oVDevicesService.hasVideoDeviceAvailable();
    this.hasAudioDevices = this.oVDevicesService.hasAudioDeviceAvailable();
    this.subscribeToLocalUsers();
    this.subscribeToRemoteUsers();

    setTimeout(() => {
      this.openviduLayout = new OpenViduLayout();
      this.openviduLayoutOptions = this.utilsSrv.getOpenviduLayoutOptions();
      this.openviduLayout.initLayoutContainer(document.getElementById('layout'), this.openviduLayoutOptions);
      this.checkSizeComponent();
      this.joinToSession();
    }, 50);
  }

  joinToSession() {
    this.oVSessionService.initialize();
    this.session = this.localUser.getCamera().getSession();
    this._session.emit(this.session);
    this.sessionScreen = this.localUser.getScreen().getSession();
    this.subscribeToStreamCreated();
    this.subscribeToStreamDestroyed();
    this.subscribeToStreamPropertyChange();
    this.subscribeToNicknameChanged();
    this.utilsSrv.setSideNav(this.chatSidenav);
    this.chatService.subscribeToChat();
    this.subscribeToSideNav();
    this.subscribeToReconnection();
    this.connectToSession().then(() => {
      this.signalService.subscribeAll();
      this.qaService.subscribeToAnswers();
      this.qaService.subscribeToQuestion();
      this.subscribeToSpeechDetection();
      this.subscribeToWhiteboardState();
      this.whiteboardService.subscribeToUpdates();
      this.signalService.subscribeToLeaveSession(() => {
        this.oVSessionService.disconnect();
        this._leaveSession.emit();
      });
    });
  }

  leaveSession(showDialog = false) {
    this.log.d('Leaving session...');
    if (showDialog) {
      const result = this.matDialog.open(DialogEndMeetingComponent, {
        data: {
          user: this.getLocalUser(),
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
    if (this.localUser.cameraEnabled()) {
      this.oVSessionService.publishWebcamAudio(!this.localUser.getCamera().isAudioActive());
      return;
    }
  }

  toggleChat() {
    this.utilsSrv.toggleSideNav(SideNavComponents.CHAT);
  }

  toggleParticipants() {
    this.utilsSrv.toggleSideNav(SideNavComponents.PARTICIPANTS);
  }

  toggleQuestionsAndAnswers() {
    this.utilsSrv.toggleSideNav(SideNavComponents.QUESTIONS_AND_ANSWERS);
  }

  async toggleCam() {
    if (!this.hasVideoDevices) {
      this.utilsSrv.showErrorMessage(
        "Can't find your camera",
        "Check that your camera is available and not in use by another application. If it's not available, plug one in."
      );
      return;
    }
    const isVideoActive = !this.localUser.getCamera().isVideoActive();

    this.localUser.getCamera().publishVideo(isVideoActive);
  }

  toggleWhiteboard() {
    if (!this.localUser.isWhiteboardActive() || this.localUser.isWhiteboardOwner()) {
      if (this.localUser.screenEnabled()) {
        this.utilsSrv.alert(
          'Stop screen sharing',
          'Stop screen sharing in order to share whiteboard.',
          [
            {
              text: 'Yes',
              onClick: () => {
                this.toggleScreenShare();
                this.whiteboardShown = true;
                this.fireWhiteboardStateChanged();
              },
            },
            {
              text: 'No',
              onClick: () => {},
            },
          ],
          true
        );
      } else {
        this.whiteboardShown = !this.whiteboardShown;
        this.fireWhiteboardStateChanged();
      }
    } else {
      this.whiteboardShown = !this.whiteboardShown;
    }
  }

  private fireWhiteboardStateChanged() {
    const sessionInfo = {
      active: this.whiteboardShown,
      createdBy: this.whiteboardShown ? this.localUser.getUserId() : null,
    };
    this.oVSessionService.updateWhiteboard(sessionInfo);
    this.whiteboardCanvas.calculateDimensions();
    this.signalService.send(
      this.whiteboardShown ? SignalTypes.WHITEBOARD_SHARING_STARTED : SignalTypes.WHITEBOARD_SHARING_ENDED,
      sessionInfo
    );
  }

  async toggleScreenShare() {
    // Disabling screenShare
    if (this.localUser.screenEnabled()) {
      this.removeScreen();
      return;
    }
    if (!this.localUser.isWhiteboardActive()) {
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
        this.log.d('ACCESS ALLOWED screenPublisher');
        this.oVSessionService.enableScreen(screenPublisher);
        this.localUser
          .getScreen()
          .publish()
          .then(() => {
            this.localUser.getScreen().publishAudio(false);
          });
      });

      screenPublisher.once('accessDenied', event => {
        this.utilsSrv.showErrorMessage(
          'Screen Sharing Error',
          'An error occurred while screen sharing. Please try again.'
        );
      });

      return;
    } else {
      await this.oVSessionService.publishWebcam(true);
      this.oVSessionService.publishWebcamAudio(true);
      this.oVSessionService.enableWebcam();
      this.removeScreen();
    }
  }

  toggleSpeakerLayout() {
    if (!this.localUser.screenEnabled()) {
      this.isAutoLayout = !this.isAutoLayout;

      this.log.d('Automatic Layout ', this.isAutoLayout ? 'Disabled' : 'Enabled');
      if (this.isAutoLayout) {
        return;
      }
      this.log.d('Unsubscribe to speech detection');
      this.session.off('publisherStartSpeaking');
      this.resetAllBigElements();
      this.updateOpenViduLayout();
      return;
    }
    this.log.w('Screen is enabled. Speech detection has been rejected');
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
    return this.localUser.getCamera().isAudioActive();
  }

  private async connectToSession(): Promise<void> {
    const userSession = await this.initializeSession();
    this.oVSessionService.setLocalUserSession(userSession);

    await this.connectAllSessions();

    await Promise.all(
      this.localUser.getEnabledConnections().map(async connection => {
        await connection.publish();
      })
    );

    // !Deprecated
    this._joinSession.emit();

    this.updateOpenViduLayout();
  }

  private async connectAllSessions() {
    try {
      await this.oVSessionService.connectSessions();

      this.localUser.forEach(connection => {
        if (connection.getPublisher()) {
          connection.getPublisher().on('streamPlaying', () => {
            connection.getPublisher().videos[0].video.parentElement.classList.remove('custom-class');
          });
        }
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

      if (this.localUser.isWhiteboardOwner()) {
        this.fireWhiteboardStateChanged();
      }
    });
  }

  private subscribeToStreamDestroyed() {
    this.session.on('streamDestroyed', (event: StreamEvent) => {
      const connectionId = event.stream.connection.connectionId;

      const user = this.remoteUsersService.getRemoteUserByConnectionId(connectionId);
      if (user.isWhiteboardOwner()) {
        this.whiteboardSharingEnded({
          createdBy: null,
          active: false,
        });
      }
      this.remoteUsersService.remove(connectionId);
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
        const allUsers = this.remoteUsers;
        this.remoteUsersService.updateUsers(allUsers);
      }
    });
  }

  private subscribeToNicknameChanged() {
    this.session.on('signal:nicknameChanged', (event: any) => {
      const connectionId = event.from.userId;
      if (this.oVSessionService.isMyOwnConnection(connectionId)) {
        return;
      }
      const nickname = JSON.parse(event.data).nickname;
      this.remoteUsersService.updateNickname(connectionId, nickname);
    });
  }

  private subscribeToWhiteboardState() {
    this.signalService.subscribe(SignalTypes.WHITEBOARD_SHARING_STARTED, data => {
      this.whiteboardShown = true;
      this.oVSessionService.updateLocalUserSession(user => {
        user.setWhiteboardSession(data);
        return user;
      });

      this.whiteboardService.send({
        type: CanvasWhiteboardUpdateTypes.SYNCHRONIZATION_REQUEST,
      });

      this.whiteboardCanvas?.calculateDimensions();
    });
    this.signalService.subscribe(SignalTypes.WHITEBOARD_SHARING_ENDED, data => {
      this.whiteboardSharingEnded(data);
    });
  }

  private whiteboardSharingEnded(data: WhiteboardSessionInfo) {
    this.oVSessionService.updateLocalUserSession(user => {
      user.setWhiteboardSession(data);
      return user;
    });
    this.whiteboardService.receive({
      type: CanvasWhiteboardUpdateTypes.CLEAR_CANVAS,
    });
    this.whiteboardShown = false;
  }

  private subscribeToSpeechDetection() {
    this.log.d('Subscribe to speech detection', this.session);
    this.session.on('publisherStartSpeaking', (event: PublisherSpeakingEvent) => {
      const user = this.remoteUsersService.getRemoteUserByConnectionId(event.connection.connectionId);
      const connection = user.getByConnectionId(event.connection.connectionId);
      connection.setSpeaking(true);
      this.remoteUsersService.updateUsers();
    });
    this.session.on('publisherStopSpeaking', (event: PublisherSpeakingEvent) => {
      const user = this.remoteUsersService.getRemoteUserByConnectionId(event.connection.connectionId);
      const connection = user.getByConnectionId(event.connection.connectionId);
      connection.setSpeaking(false);
      this.remoteUsersService.updateUsers();
    });
  }

  private removeScreen() {
    this.oVSessionService.disableScreen();
    this.oVSessionService.unPublishScreen();
  }

  private subscribeToSideNav() {
    this.sideNavSubscription = this.utilsSrv.sidenavContentObs.subscribe(value => {
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
    const properties = OpenViduSessionService.createProperties(videoSource, undefined, true, false, false);

    try {
      return this.localUser.initializePublisher(VideoType.SCREEN, undefined, properties);
    } catch (error) {
      this.log.e(error);
      this.utilsSrv.handlerScreenShareError(error);
    }
  }

  private async initializeSession(): Promise<OpenviduUserSession> {
    this.log.d('Generating tokens...', this.mySessionId);
    try {
      return await this.networkSrv.getToken(
        this.mySessionId,
        this.externalConfig.user,
        this.externalConfig.sessionConfig
      );
    } catch (error) {
      this._error.emit({ error: error.error, message: error.message, code: error.code, status: error.status });
      if (error.status === 404) {
        this.utilsSrv.showErrorMessage(
          'Meeting not started',
          'The meeting has not yet been started by the organizer.',
          true,
          this.externalConfig.redirectOnEnd
        );
      } else {
        this.log.e('There was an error getting the token:', error.status, error.message);
        this.utilsSrv.showErrorMessage('There was an error getting the token:', error.error || error.message);
      }
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
    this.oVUsersSubscription = this.oVSessionService.userObs.subscribe(user => {
      this.localUser = user;
      this.updateOpenViduLayout();
    });
  }

  private subscribeToRemoteUsers() {
    this.remoteUsersSubscription = this.remoteUsersService.remoteUsers.subscribe(users => {
      this.remoteUsers = [...users];
      this.updateOpenViduLayout();
    });
  }

  toggleEveryoneMic(unmute: boolean) {
    const request = !(unmute
      ? this.can(MeetingCapabilities.UNMUTE_PARTICIPANTS)
      : this.can(MeetingCapabilities.MUTE_PARTICIPANTS));

    this.signalService.send(SignalTypes.TOGGLE_AUDIO, {
      request,
    });
  }

  toggleEveryoneVideo(turnOn: boolean) {
    const request = !(turnOn
      ? this.can(MeetingCapabilities.TURN_ON_PARTICIPANTS_VIDEO)
      : this.can(MeetingCapabilities.TURN_OFF_PARTICIPANTS_VIDEO));
    this.signalService.send(SignalTypes.TOGGLE_VIDEO, {
      request,
    });
  }

  getLocalUser() {
    return this.localUser;
  }

  can(capability: MeetingCapabilities) {
    return this.getLocalUser().can(capability);
  }

  toggleFullSize() {
    this.isFullSize = !this.isFullSize;
    this.updateOpenViduLayout(100);
  }
}

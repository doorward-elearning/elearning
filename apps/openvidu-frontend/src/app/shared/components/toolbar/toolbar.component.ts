import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { VideoFullscreenIcon } from '../../types/icon-type';
import { ChatService } from '../../services/chat/chat.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import { MeetingCapabilitiesComponent } from '@doorward/common/types/openvidu';
import { UserModel } from '../../models/user-model';
import { ExternalConfigModel } from '../../models/external-config';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent extends MeetingCapabilitiesComponent implements OnInit, OnDestroy {
  @Input() lightTheme: boolean;
  @Input() mySessionId: boolean;
  @Input() sessionTitle: string;
  @Input() compact: boolean;
  @Input() showNotification: boolean;
  @Input() whiteboardShown: boolean;
  @Input() localUser: UserModel | undefined;

  @Input() isAutoLayout: boolean;
  @Input() isConnectionLost: boolean;
  @Input() hasVideoDevices: boolean;
  @Input() hasAudioDevices: boolean;
  @Output() micButtonClicked = new EventEmitter<any>();
  @Output() camButtonClicked = new EventEmitter<any>();
  @Output() screenShareClicked = new EventEmitter<any>();
  @Output() leaveSessionButtonClicked = new EventEmitter<any>();
  @Output() participantsListButtonClicked = new EventEmitter<any>();
  @Output() chatButtonClicked = new EventEmitter<any>();
  @Output() whiteboardButtonClicked = new EventEmitter();

  newMessagesNum: number;
  private chatServiceSubscription: Subscription;

  fullscreenIcon = VideoFullscreenIcon.BIG;
  logoUrl: string;

  participantsNames: string[] = [];
  numParticipants = 0;

  constructor(
    private utilsSrv: UtilsService,
    private chatService: ChatService,
    private remoteUserService: RemoteUsersService
  ) {
    super();
    this.chatServiceSubscription = this.chatService.messagesUnreadObs.subscribe(num => {
      this.newMessagesNum = num;
    });
  }
  ngOnDestroy(): void {
    this.chatServiceSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    const maxHeight = window.screen.height;
    const maxWidth = window.screen.width;
    const curHeight = window.innerHeight;
    const curWidth = window.innerWidth;
    if (maxWidth !== curWidth && maxHeight !== curHeight) {
      this.fullscreenIcon = VideoFullscreenIcon.BIG;
    }
  }

  ngOnInit() {
    this.remoteUserService.getRemoteUsers().subscribe(users => {
      this.numParticipants = users.length + 1;
    });

    this.checkLogo();
    this.utilsSrv.theme.subscribe(this.checkLogo);
  }

  checkLogo(theme = this.utilsSrv.getTheme()) {
    const localUserSession = this.localUser?.session;
    const defaultLogo = ExternalConfigModel.DEFAULT_SESSION_CONFIG.logoUrl[theme];
    if (typeof localUserSession?.sessionConfig.logoUrl === 'object') {
      this.logoUrl = (localUserSession && localUserSession.sessionConfig.logoUrl[theme]) || defaultLogo;
    } else {
      this.logoUrl = localUserSession ? localUserSession.sessionConfig.logoUrl : defaultLogo;
    }
  }

  toggleMicrophone() {
    this.micButtonClicked.emit();
  }

  toggleCamera() {
    this.camButtonClicked.emit();
  }

  toggleScreenShare() {
    this.screenShareClicked.emit();
  }

  leaveSession() {
    this.leaveSessionButtonClicked.emit();
  }

  toggleChat() {
    this.chatButtonClicked.emit();
  }

  toggleParticipants() {
    this.participantsListButtonClicked.emit();
  }

  toggleFullscreen() {
    this.utilsSrv.toggleFullscreen('videoRoomNavBar');
    this.fullscreenIcon =
      this.fullscreenIcon === VideoFullscreenIcon.BIG ? VideoFullscreenIcon.NORMAL : VideoFullscreenIcon.BIG;
  }
}

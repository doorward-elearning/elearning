import { Component, OnInit, Input, EventEmitter, Output, HostListener, OnDestroy } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { VideoFullscreenIcon } from '../../types/icon-type';
import { OvSettingsModel } from '../../models/ovSettings';
import { ChatService } from '../../services/chat/chat.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from '../../../../environments/environment';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() lightTheme: boolean;
  @Input() mySessionId: boolean;
  @Input() sessionTitle: string;
  @Input() compact: boolean;
  @Input() showNotification: boolean;
  @Input() ovSettings: OvSettingsModel;

  @Input() isWebcamVideoEnabled: boolean;
  @Input() isWebcamAudioEnabled: boolean;
  @Input() isScreenEnabled: boolean;
  @Input() isAutoLayout: boolean;
  @Input() isConnectionLost: boolean;
  @Input() hasVideoDevices: boolean;
  @Input() hasAudioDevices: boolean;
  @Output() micButtonClicked = new EventEmitter<any>();
  @Output() camButtonClicked = new EventEmitter<any>();
  @Output() screenShareClicked = new EventEmitter<any>();
  @Output() layoutButtonClicked = new EventEmitter<any>();
  @Output() leaveSessionButtonClicked = new EventEmitter<any>();
  @Output() participantsListButtonClicked = new EventEmitter<any>();
  @Output() chatButtonClicked = new EventEmitter<any>();

  newMessagesNum: number;
  private chatServiceSubscription: Subscription;

  fullscreenIcon = VideoFullscreenIcon.BIG;
  logoUrl = environment.CLOUDINARY_IMAGE_DIRECTORY + 'doorward_full_logo_white.png';

  participantsNames: string[] = [];
  numParticipants = 0;

  constructor(
    private utilsSrv: UtilsService,
    private chatService: ChatService,
    private remoteUserService: RemoteUsersService
  ) {
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
    if (this.ovSettings.logoUrl) {
      this.logoUrl = this.ovSettings.logoUrl;
    }

    this.remoteUserService.getRemoteUsers().subscribe(users => {
      this.numParticipants = users.length;
    });
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

  toggleSpeakerLayout() {
    this.layoutButtonClicked.emit();
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

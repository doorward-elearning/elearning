import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UserModel } from '../../models/user-model';
import { FormControl } from '@angular/forms';
import { NicknameMatcher } from '../../forms-matchers/nickname';
import { UtilsService } from '../../services/utils/utils.service';
import { LayoutType } from '../../types/layout-type';
import { VideoFullscreenIcon, VideoSizeIcon } from '../../types/icon-type';
import greys from '@doorward/ui/colors/greys';
import Tools from '@doorward/common/utils/Tools';
import { SignalsService } from '../../services/signals/signals.service';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import { VideoType } from '../../types/video-type';
import UserConnection from '../../models/user-connection';

@Component({
  selector: 'stream-component',
  styleUrls: ['./stream.component.css'],
  templateUrl: './stream.component.html',
})
export class StreamComponent implements OnInit {
  videoSizeIcon: VideoSizeIcon = VideoSizeIcon.BIG;
  fullscreenIcon: VideoFullscreenIcon = VideoFullscreenIcon.BIG;
  toggleNickname: boolean;
  isFullscreen: boolean;
  isZoomedIn: boolean;

  nicknameFormControl: FormControl;
  matcher: NicknameMatcher;

  user: UserModel;
  connection: UserConnection;
  @Input() localUser: UserModel;
  @Input() type: VideoType;
  @Output() nicknameClicked = new EventEmitter<any>();
  @Output() replaceScreenTrackClicked = new EventEmitter<any>();
  @Output() toggleVideoSizeClicked = new EventEmitter<any>();

  @ViewChild('streamComponent', { read: ViewContainerRef }) streamComponent: ViewContainerRef;

  constructor(private utilsSrv: UtilsService, private signalsService: SignalsService) {}

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    const maxHeight = window.screen.height;
    const maxWidth = window.screen.width;
    const curHeight = window.innerHeight;
    const curWidth = window.innerWidth;
    this.isFullscreen = maxWidth === curWidth && maxHeight === curHeight;
  }

  // Has been mandatory fullscreen Input because of Input user did not fire changing
  // the fullscreen user property in publisherStartSpeaking event in VideoRoom Component
  @Input()
  set videoSizeBig(videoSizeBig: boolean) {
    this.isZoomedIn = videoSizeBig;
  }

  @ViewChild('nicknameInput')
  set nicknameInputElement(element: ElementRef) {
    setTimeout(() => {
      element?.nativeElement.focus();
    });
  }

  ngOnInit() {
    this.matcher = new NicknameMatcher();
    this.connection = this.user.getConnection(this.type);
  }

  toggleVideoSize(resetAll?) {
    const element = this.utilsSrv.getHTMLElementByClassName(
      this.streamComponent.element.nativeElement,
      LayoutType.ROOT_CLASS
    );
    this.toggleVideoSizeClicked.emit({ element, connectionId: this.connection.getConnectionId(), resetAll });
  }

  toggleFullscreen() {
    this.utilsSrv.toggleFullscreen('container-' + this.connection.getStream().streamId);
  }

  toggleSound() {
    this.signalsService.send(
      SignalTypes.TOGGLE_AUDIO,
      {
        request: this.localUser.can(
          !this.localUser.isAudioActive()
            ? MeetingCapabilities.MUTE_PARTICIPANTS
            : MeetingCapabilities.UNMUTE_PARTICIPANTS
        ),
      },
      [this.user]
    );
  }

  isMine() {
    return this.user.isLocal();
  }

  toggleNicknameForm() {
    if (this.user.isLocal()) {
      this.toggleNickname = !this.toggleNickname;
    }
  }

  eventKeyPress(event) {
    if (event && event.keyCode === 13 && this.nicknameFormControl.valid) {
      this.nicknameClicked.emit(this.nicknameFormControl.value);
      this.toggleNicknameForm();
    }
  }

  replaceScreenTrack() {
    this.replaceScreenTrackClicked.emit();
  }

  greyBackground(user: string): string {
    const colors = greys;
    const index = Tools.hashCode(user);
    return colors[index % colors.length];
  }
}

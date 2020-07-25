import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UserModel } from '../../models/user-model';
import { UtilsService } from '../../services/utils/utils.service';
import { LayoutType } from '../../types/layout-type';
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
  @Input() localUser: UserModel;
  @Input() type: VideoType;
  user: UserModel;

  @Output() replaceScreenTrackClicked = new EventEmitter<any>();
  @Output() toggleVideoSizeClicked = new EventEmitter<any>();

  isFullscreen: boolean;
  isZoomedIn: boolean;

  connection: UserConnection;

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

  @Input()
  set currentUser(user: UserModel) {
    this.user = user;
    this.connection = this.user.getConnection(this.type);
    this.isZoomedIn = this.connection.isZoomedIn();
  }

  ngOnInit() {}

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

  replaceScreenTrack() {
    this.replaceScreenTrackClicked.emit();
  }

  greyBackground(user: string): string {
    const colors = greys;
    const index = Tools.hashCode(user);
    return colors[index % colors.length];
  }
}

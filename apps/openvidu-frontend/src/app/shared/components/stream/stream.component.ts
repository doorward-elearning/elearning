import {
  AfterViewInit,
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
import { UtilsService } from '../../services/utils/utils.service';
import { LayoutType } from '../../types/layout-type';
import greys from '@doorward/ui/colors/greys';
import Tools from '@doorward/common/utils/Tools';
import { SignalsService } from '../../services/signals/signals.service';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import UserConnection from '../../models/user-connection';

@Component({
  selector: 'stream-component',
  styleUrls: ['./stream.component.scss'],
  templateUrl: './stream.component.html',
})
export class StreamComponent implements OnInit, AfterViewInit {
  @Input() localUser: UserModel;
  @Input() user: UserModel;
  @Input() connection: UserConnection;

  @Output() replaceScreenTrackClicked = new EventEmitter<any>();
  @Output() toggleVideoSizeClicked = new EventEmitter<any>();

  isFullscreen: boolean;
  width: number;
  height: number;

  @ViewChild('streamComponent') streamComponent: ElementRef<HTMLDivElement>;

  constructor(private utilsSrv: UtilsService, private signalsService: SignalsService) {}

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    const maxHeight = window.screen.height;
    const maxWidth = window.screen.width;
    const curHeight = window.innerHeight;
    const curWidth = window.innerWidth;
    this.isFullscreen = maxWidth === curWidth && maxHeight === curHeight;

    const dimensions = this.streamComponent.nativeElement?.getBoundingClientRect();
    if (dimensions) {
      this.width = dimensions.width;
      this.height = dimensions.height;
    }
  }

  ngOnInit() {
    if (this.connection.isZoomedIn()) {
      this.toggleVideoSize();
    }
  }

  ngAfterViewInit(): void {}

  toggleVideoSize(resetAll?) {
    const element = this.utilsSrv.getHTMLElementByClassName(this.streamComponent.nativeElement, LayoutType.ROOT_CLASS);
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

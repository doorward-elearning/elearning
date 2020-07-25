import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../models/user-model';
import { NicknameMatcher } from '../../forms-matchers/nickname';
import { UtilsService } from '../../services/utils/utils.service';
import { Publisher } from 'openvidu-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';
import { CameraType, IDevice } from '../../types/device-type';
import { DevicesService } from '../../services/devices/devices.service';
import { Subscription } from 'rxjs';
import { AvatarType } from '../../types/chat-type';
import { LoggerService } from '../../services/logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { ScreenType } from '../../types/video-type';
import { ExternalConfigModel } from '../../models/external-config';
import { OvSettingsModel } from '../../models/ovSettings';
import { StorageService } from '../../services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPermissionsComponent } from '../dialog-permissions/dialog-permissions.component';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';

@Component({
  selector: 'app-room-config',
  templateUrl: './room-config.component.html',
  styleUrls: ['./room-config.component.css'],
})
export class RoomConfigComponent implements OnInit, OnDestroy {
  private readonly USER_NICKNAME = 'openviduCallNickname';
  @ViewChild('bodyCard') bodyCard: ElementRef;

  @Input() externalConfig: ExternalConfigModel;
  @Input() ovSettings: OvSettingsModel;
  @Output() join = new EventEmitter<any>();
  @Output() leaveSession = new EventEmitter<any>();

  // Webcomponent event
  @Output() publisherCreated = new EventEmitter<any>();

  mySessionId: string;

  cameras: IDevice[];
  microphones: IDevice[];
  camSelected: IDevice;
  micSelected: IDevice;
  isVideoActive = true;
  isAudioActive = true;
  oVUsersSubscription: Subscription;
  localUsers: UserModel[] = [];

  hasVideoDevices: boolean;
  hasAudioDevices: boolean;
  showConfigCard: boolean;

  private log: ILogger;

  constructor(
    private route: ActivatedRoute,
    private utilsSrv: UtilsService,
    public oVSessionService: OpenViduSessionService,
    private oVDevicesService: DevicesService,
    private loggerSrv: LoggerService,
    private storageSrv: StorageService,
    private dialog: MatDialog
  ) {
    this.log = this.loggerSrv.get('RoomConfigComponent');
  }

  async ngOnInit() {
    this.handleSessionConfig(this.externalConfig);
    this.subscribeToUsers();
    this.setSessionName();
    await this.oVDevicesService.initDevices();
    this.setDevicesInfo();
    await this.checkPermissions();
    this.initWebcamPublisher();
  }

  handleSessionConfig(user: UserModel | ExternalConfigModel) {
    if (user) {
      this.isVideoActive = user.can(MeetingCapabilities.JOIN_WITH_ACTIVE_VIDEO) && this.externalConfig.hasVideo();
      this.isAudioActive = user.can(MeetingCapabilities.JOIN_WITH_ACTIVE_AUDIO) && this.externalConfig.hasAudio();
    }
  }

  async checkPermissions() {
    let microphone;
    let video;
    try {
      microphone = await navigator.permissions.query({ name: 'microphone' });
      video = await navigator.permissions.query({ name: 'camera' });
    } catch (error) {
      microphone = {
        state: atob(localStorage.getItem(btoa('audioAllowed'))) === '__true__' ? 'allowed' : 'prompt',
      };
      video = {
        state: atob(localStorage.getItem(btoa('videoAllowed'))) === '__true__' ? 'allowed' : 'prompt',
      };
    }

    const devices = await this.oVSessionService.getDevices();

    const requestMicrophone = microphone.state === 'prompt' && devices.some(device => device.kind === 'audioinput');
    const requestVideo = video.state === 'prompt' && devices.some(device => device.kind === 'videoinput');

    if (requestMicrophone || requestVideo) {
      await this.dialog
        .open(DialogPermissionsComponent, {
          data: {
            requestAudio: requestMicrophone,
            requestVideo: requestVideo,
            redirectOnClose: this.externalConfig.redirectOnEnd,
          },
        })
        .afterClosed()
        .toPromise();

      try {
        if (requestMicrophone) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          localStorage.setItem(btoa('audioAllowed'), btoa('__true__'));
        }
        if (requestVideo) {
          await navigator.mediaDevices.getUserMedia({ video: true });
          localStorage.setItem(btoa('videoAllowed'), btoa('__true__'));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  ngOnDestroy() {
    this.oVUsersSubscription.unsubscribe();
  }

  joinSession() {
    this.join.emit();
    this.scrollToBottom();
  }

  private setDevicesInfo() {
    this.hasVideoDevices = this.oVDevicesService.hasVideoDeviceAvailable();
    this.hasAudioDevices = this.oVDevicesService.hasAudioDeviceAvailable();
    this.microphones = this.oVDevicesService.getMicrophones();
    this.cameras = this.oVDevicesService.getCameras();
    this.camSelected = this.oVDevicesService.getCamSelected();
    this.micSelected = this.oVDevicesService.getMicSelected();
  }

  private setSessionName() {
    this.route.params.subscribe((params: Params) => {
      this.mySessionId = this.externalConfig ? this.externalConfig.sessionId : params.roomName;
      this.oVSessionService.setSessionId(this.mySessionId);
    });
  }

  private scrollToBottom(): void {
    try {
      this.bodyCard.nativeElement.scrollTop = this.bodyCard.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private subscribeToUsers() {
    this.oVUsersSubscription = this.oVSessionService.OVUsers.subscribe(users => {
      this.localUsers = users;
      if (users[0].session) {
        this.handleSessionConfig(users[0]);
      }
    });
  }

  private initWebcamPublisher() {
    const micStorageDevice = this.micSelected?.device || undefined;
    const camStorageDevice = this.camSelected?.device || undefined;

    const videoSource = this.hasVideoDevices ? camStorageDevice : false;
    const audioSource = this.hasAudioDevices ? micStorageDevice : false;
    const publishAudio = this.hasAudioDevices ? this.isAudioActive : false;
    const publishVideo = this.hasVideoDevices ? this.isVideoActive : false;
    const mirror = this.camSelected && this.camSelected.type === CameraType.FRONT;
    const properties = this.oVSessionService.createProperties(
      videoSource,
      audioSource,
      publishVideo,
      publishAudio,
      mirror
    );
    const publisher = this.oVSessionService.initCamPublisher(undefined, properties);
    this.handlePublisherSuccess(publisher);
    this.handlePublisherError(publisher);
  }

  private emitPublisher(publisher) {
    this.publisherCreated.emit(publisher);
  }

  private handlePublisherSuccess(publisher: Publisher) {
    publisher.once('accessAllowed', async () => {
      if (this.oVDevicesService.areEmptyLabels()) {
        await this.oVDevicesService.initDevices();
        if (this.hasAudioDevices) {
          const audioLabel = publisher.stream.getMediaStream().getAudioTracks()[0].label;
          this.oVDevicesService.setMicSelected(audioLabel);
        }

        if (this.hasVideoDevices) {
          const videoLabel = publisher.stream.getMediaStream().getVideoTracks()[0].label;
          this.oVDevicesService.setCamSelected(videoLabel);
        }
        this.setDevicesInfo();
      }
      // Emit publisher to webcomponent and angular-library
      this.emitPublisher(publisher);

      if (this.ovSettings.autopublish) {
        this.joinSession();
        return;
      }
      this.showConfigCard = true;
    });
  }

  private handlePublisherError(publisher: Publisher) {
    publisher.once('accessDenied', (e: any) => {
      let message: string;
      if (e.name === 'DEVICE_ACCESS_DENIED') {
        message =
          "Access to media devices was not allowed. \nKindly confirm that you have a microphone & a webcam installed, or check whether they are blocked in your browser's settings";
      }
      if (e.name === 'NO_INPUT_SOURCE_SET') {
        message = 'No video or audio devices have been found. Please, connect at least one.';
      }
      this.utilsSrv.showErrorMessage(e.name.replace(/_/g, ' '), message, true, this.externalConfig.redirectOnEnd);
      this.log.e(e.message);
    });
  }
}

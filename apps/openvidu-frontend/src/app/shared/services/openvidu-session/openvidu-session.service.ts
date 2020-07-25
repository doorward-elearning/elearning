import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { Device, Publisher, PublisherProperties } from 'openvidu-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScreenType, VideoType } from '../../types/video-type';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { OpenviduUserSession } from '@doorward/common/types/openvidu';
import UserConnection from '../../models/user-connection';

@Injectable({
  providedIn: 'root',
})
export class OpenViduSessionService {
  constructor(private loggerSrv: LoggerService) {
    this.log = this.loggerSrv.get('OpenViduSessionService');
    this.userObs = this._user.asObservable();
  }

  private sessionId = '';
  private log: ILogger;

  userObs: Observable<UserModel>;
  private _user = new BehaviorSubject<UserModel>(null);

  static createProperties(
    videoSource: string | MediaStreamTrack | boolean,
    audioSource: string | MediaStreamTrack | boolean,
    publishVideo: boolean,
    publishAudio: boolean,
    mirror: boolean
  ): PublisherProperties {
    return {
      videoSource,
      audioSource,
      publishVideo,
      publishAudio,
      mirror,
    };
  }

  initialize(session: OpenviduUserSession) {
    this._user.next(new UserModel(session));
  }

  updateLocalUserSession(callback: (user: UserModel) => UserModel) {
    this.setLocalUserSession(callback(this.getUser()).session);
  }

  setLocalUserSession(user: OpenviduUserSession) {
    const userModel = this._user.getValue();
    userModel.updateSession(user);
    this._user.next(userModel);
  }

  getUser(): UserModel {
    return this._user.getValue();
  }

  getDevices(): Promise<Device[]> {
    return this.getUser().getDevices();
  }

  getConnectedUserSession(): UserConnection {
    return this.getUser().getConnectedSession();
  }

  async connectSessions(): Promise<any> {
    return this.getUser().connect();
  }

  enableWebcam() {
    this.getUser()
      .getCamera()
      .enable();
  }

  enableScreen(screenPublisher: Publisher) {
    this.getUser()
      .getScreen()
      .setPublisher(screenPublisher);
    this.refresh();
  }

  enableWhiteboard(whiteboardPublisher: Publisher) {
    this.getUser()
      .getWhiteboard()
      .setPublisher(whiteboardPublisher);
    this.refresh();
  }

  private refresh() {
    this._user.next(this.getUser());
  }

  disableWebcam() {
    this.getUser()
      .getCamera()
      .destroy();
    this.refresh();
  }

  disableScreen() {
    this.getUser()
      .getScreen()
      .destroy();
    this.refresh();
  }

  publishWebcam(isVideoActive: boolean) {
    this.getUser()
      .getCamera()
      .publishVideo(isVideoActive);
    this.refresh();
  }

  publishWebcamAudio(audio: boolean) {
    this.getUser()
      .getCamera()
      .publishAudio(audio);
    this.refresh();
  }

  replaceTrack(videoSource: string, audioSource: string, mirror = true): Publisher {
    if (videoSource) {
      this.log.d('Replacing video track ' + videoSource);
    }
    if (audioSource) {
      this.log.d('Replacing audio track ' + audioSource);
    }
    this.disableWebcam();
    const properties = OpenViduSessionService.createProperties(
      videoSource,
      audioSource,
      this.getUser()
        .getCamera()
        .isVideoActive(),
      this.getUser()
        .getCamera()
        .isAudioActive(),
      mirror
    );
    return this.getUser().initializePublisher(VideoType.CAMERA, undefined, properties);
  }

  async replaceScreenTrack() {
    const videoSource = ScreenType.SCREEN;
    const properties = OpenViduSessionService.createProperties(videoSource, undefined, true, false, false);

    this.stopScreenTracks();
    return this.getUser()
      .getScreen()
      .createMediaStream(properties);
  }

  destroyUsers() {
    this.getUser().destroyAll();
  }

  disconnect() {
    this.getUser().disconnectAll();
    this.stopScreenTracks();
    this.destroyUsers();
  }

  isMyOwnConnection(connectionId: string): boolean {
    return this.getUser().isMyOwnConnection(connectionId);
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  resetUsersZoom() {
    this.getUser()
      .getConnections()
      .forEach(connection => {
        connection.connection.zoomOut();
      });
  }

  toggleZoom(connectionId: string) {
    if (this.getUser().isMyOwnConnection(connectionId)) {
      this.getUser()
        .getByConnectionId(connectionId)
        .toggleZoom();
    }
  }

  private stopScreenTracks() {
    this.getUser()
      .getScreen()
      .stopVideoTracks();
  }

  getUserSession(): OpenviduUserSession {
    return this.getUser().session;
  }

  async unPublishScreen() {
    return this.getUser()
      .getScreen()
      .unPublish();
  }

  async unPublishWebcam() {
    return this.getUser()
      .getCamera()
      .unPublish();
  }

  async unPublishWhiteboard() {
    return this.getUser()
      .getWhiteboard()
      .unPublish();
  }
}

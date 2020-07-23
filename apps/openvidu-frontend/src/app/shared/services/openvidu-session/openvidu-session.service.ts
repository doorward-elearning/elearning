import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { Device, OpenVidu, Publisher, PublisherProperties, Session } from 'openvidu-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScreenType } from '../../types/video-type';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { OpenviduUserSession } from '@doorward/common/types/openvidu';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import Capabilities from '@doorward/common/utils/Capabilities';

@Injectable({
  providedIn: 'root',
})
export class OpenViduSessionService {
  OVUsers: Observable<UserModel[]>;
  private _OVUsers = new BehaviorSubject([]);
  private OV: OpenVidu = null;
  private OVScreen: OpenVidu = null;
  private OVWhiteboard: OpenVidu = null;

  private webcamSession: Session = null;
  private screenSession: Session = null;
  private whiteboardSession: Session = null;

  private webcamUser: UserModel = null;
  private screenUser: UserModel = null;
  private whiteboardUser: UserModel = null;

  private videoSource = undefined;
  private audioSource = undefined;
  private sessionId = '';
  private log: ILogger;

  private screenMediaStream: MediaStream = null;
  private webcamMediaStream: MediaStream = null;

  private user: OpenviduUserSession;

  constructor(private loggerSrv: LoggerService) {
    this.log = this.loggerSrv.get('OpenViduSessionService');
    this.OV = new OpenVidu();
    this.OVScreen = new OpenVidu();

    this.OVUsers = this._OVUsers.asObservable();
    this.webcamUser = new UserModel();
    this._OVUsers.next([this.webcamUser]);
  }

  initSessions() {
    this.webcamSession = this.OV.initSession();
    this.screenSession = this.OVScreen.initSession();
    this.whiteboardSession = this.OVWhiteboard.initSession();
  }

  updateLocalUserSession(callback: (user: UserModel) => UserModel) {
    this.setLocalUserSession(callback(this.webcamUser).session);
  }

  setLocalUserSession(user: OpenviduUserSession) {
    this.user = user;
    if (this.user.sessionConfig?.capabilities && !this.user.sessionConfig.capabilities?.has) {
      this.user.sessionConfig.capabilities = new Capabilities<typeof MeetingCapabilities>(
        MeetingCapabilities,
        (this.user.sessionConfig.capabilities as any).capabilities
      );
    }
    if (this.webcamUser) {
      this.webcamUser.session = user;
    }
    if (this.screenUser) {
      this.screenUser.session = user;
    }
    this._OVUsers.next(this._OVUsers.getValue());
  }

  getWebcamSession(): Session {
    return this.webcamSession;
  }

  getWhiteboardSession(): Session {
    return this.whiteboardSession;
  }

  getDevices(): Promise<Device[]> {
    return this.OV.getDevices();
  }

  getConnectedUserSession(): Session {
    return this.isWebCamEnabled() ? this.getWebcamSession() : this.getScreenSession();
  }

  getScreenSession(): Session {
    return this.screenSession;
  }

  async connectWebcamSession(): Promise<any> {
    await this.webcamSession.connect(this.user.sessionInfo.webcamToken, { ...this.user });
  }

  async connectScreenSession(): Promise<any> {
    await this.screenSession.connect(this.user.sessionInfo.screenToken, { ...this.user });
  }

  async connectToWhiteboardSession(): Promise<any> {
    await this.whiteboardSession.connect(this.user.sessionInfo.whiteboardToken, { ...this.user });
  }

  async publishWebcam(): Promise<any> {
    if (this.webcamSession.capabilities.publish) {
      const publisher = this.webcamUser.getStreamManager() as Publisher;
      if (publisher) {
        return await this.webcamSession.publish(publisher);
      }
    }
    this.log.w('User cannot publish');
  }

  async publishScreen(): Promise<any> {
    if (this.screenSession.capabilities.publish) {
      const publisher = this.screenUser.getStreamManager() as Publisher;
      if (publisher) {
        return await this.screenSession.publish(publisher);
      }
    }
    this.log.w('User cannot publish');
  }

  unpublishWebcam() {
    const publisher = this.webcamUser.getStreamManager() as Publisher;
    if (publisher) {
      this.publishScreenAudio(this.hasWebcamAudioActive());
      this.webcamSession.unpublish(publisher);
    }
  }

  unpublishScreen() {
    const publisher = this.screenUser.getStreamManager() as Publisher;
    if (publisher) {
      this.screenSession.unpublish(publisher);
    }
  }

  enableWebcamUser() {
    this._OVUsers.next([this.webcamUser, this.screenUser]);
  }

  disableWebcamUser() {
    this._OVUsers.next([this.screenUser]);
  }

  enableScreenUser(screenPublisher: Publisher) {
    const connectionId = this.screenSession?.connection?.connectionId;
    this.screenUser = new UserModel(connectionId, screenPublisher, this.user);

    if (this.isWebCamEnabled()) {
      this._OVUsers.next([this.webcamUser, this.screenUser]);
      return;
    }

    this.log.d('ENABLED SCREEN SHARE');
    this._OVUsers.next([this.screenUser]);
  }

  enableWhiteboardUser(whiteboardPublisher: Publisher) {
    const connectionId = this.whiteboardSession?.connection?.connectionId;
    this.whiteboardUser = new UserModel(connectionId, whiteboardPublisher, this.user);

    if (this.isWebCamEnabled()) {
      if (this.isScreenShareEnabled()) {
        this._OVUsers.next([this.webcamUser, this.screenUser, this.whiteboardUser]);
      } else {
        this._OVUsers.next([this.webcamUser, this.whiteboardUser]);
      }
    } else {
      if (this.isScreenShareEnabled()) {
        this._OVUsers.next([this.screenUser, this.whiteboardUser]);
      } else {
        this._OVUsers.next([this.whiteboardUser]);
      }
    }
  }

  getUsers(): Observable<UserModel[]> {
    return this.OVUsers;
  }

  disableScreenUser() {
    this.destryoScreenUser();
    this._OVUsers.next([this.webcamUser]);
  }

  initCamPublisher(targetElement: string | HTMLElement, properties: PublisherProperties): Publisher {
    const publisher = this.initPublisher(targetElement, properties);
    this.webcamUser.setStreamManager(publisher);
    return publisher;
  }

  publishVideo(isVideoActive: boolean) {
    (this.webcamUser.getStreamManager() as Publisher).publishVideo(isVideoActive);
    this._OVUsers.next(this._OVUsers.getValue());
  }

  publishWebcamAudio(audio: boolean) {
    const publisher = this.webcamUser?.getStreamManager() as Publisher;
    if (publisher) {
      publisher.publishAudio(audio);
    }
    this._OVUsers.next(this._OVUsers.getValue());
  }

  publishScreenAudio(audio: boolean) {
    const publisher = this.screenUser?.getStreamManager() as Publisher;
    if (publisher) {
      publisher.publishAudio(audio);
    }
    this._OVUsers.next(this._OVUsers.getValue());
  }

  replaceTrack(videoSource: string, audioSource: string, mirror = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if (videoSource) {
        this.log.d('Replacing video track ' + videoSource);
        this.videoSource = videoSource;
        // this.stopVideoTracks(this.webcamUser.getStreamManager().stream.getMediaStream());
      }
      if (audioSource) {
        this.log.d('Replacing audio track ' + audioSource);
        this.audioSource = audioSource;
        // this.stopAudioTracks(this.webcamUser.getStreamManager().stream.getMediaStream());
      }
      this.destryoWebcamUser();
      const properties = this.createProperties(
        this.videoSource,
        this.audioSource,
        this.hasWebcamVideoActive(),
        this.hasWebcamAudioActive(),
        mirror
      );

      const publisher = this.initCamPublisher(undefined, properties);

      publisher.once('streamPlaying', () => {
        this.webcamUser.setStreamManager(publisher);
        resolve();
      });

      publisher.once('accessDenied', () => {
        reject();
      });
    });
  }

  async replaceScreenTrack() {
    const videoSource = ScreenType.SCREEN;
    const hasAudio = !this.isWebCamEnabled();
    const properties = this.createProperties(videoSource, undefined, true, hasAudio, false);

    this.stopScreenTracks();
    this.screenMediaStream = await this.OVScreen.getUserMedia(properties);
    await (this.screenUser.getStreamManager() as Publisher).replaceTrack(this.screenMediaStream.getVideoTracks()[0]);
  }

  initScreenPublisher(targetElement: string | HTMLElement, properties: PublisherProperties): Publisher {
    this.log.d('init screen properties', properties);
    return this.initPublisher(targetElement, properties);
  }

  destroyUsers() {
    this.destryoScreenUser();
    this.destryoWebcamUser();
  }
  disconnectAll() {
    this.disconnect();
  }

  disconnect() {
    if (this.webcamSession) {
      this.log.d('Disconnecting screen session');
      this.webcamSession.disconnect();
      // this.stopWebcamTracks();
      this.webcamSession = null;
    }
    if (this.screenSession) {
      // Timeout neccessary to avoid race condition error:
      // OpenVidu Error Remote connection unknown when 'onParticipantLeft'. Existing remote connections: []
      setTimeout(() => {
        this.log.d('Disconnecting screen session');
        this.screenSession.disconnect();
        this.stopScreenTracks();
        this.screenSession = null;
      }, 50);
    }
    this.destroyUsers();
  }

  isWebCamEnabled(): boolean {
    return this._OVUsers.getValue()[0].isCamera();
  }

  isOnlyScreenConnected(): boolean {
    return this._OVUsers.getValue()[0].isScreen();
  }

  hasWebcamVideoActive(): boolean {
    return this.webcamUser.isVideoActive();
  }

  hasWebcamAudioActive(): boolean {
    return this.webcamUser?.isAudioActive();
  }

  hasScreenAudioActive(): boolean {
    return this.screenUser?.isAudioActive();
  }

  areBothConnected(): boolean {
    return this._OVUsers.getValue().length === 2;
  }

  isOnlyWebcamConnected(): boolean {
    return this.isWebCamEnabled() && !this.areBothConnected();
  }

  isScreenShareEnabled(): boolean {
    return this.areBothConnected() || this.isOnlyScreenConnected();
  }

  isMyOwnConnection(connectionId: string): boolean {
    return this.webcamUser?.getConnectionId() === connectionId || this.screenUser?.getConnectionId() === connectionId;
  }

  createProperties(
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

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getScreenUserName() {
    return this.user.user.name + "'s screen";
  }

  resetUsersZoom() {
    this.webcamUser?.setVideoSizeBig(false);
    this.screenUser?.setVideoSizeBig(false);
  }

  toggleZoom(connectionId: string) {
    if (this.webcamUser.getConnectionId() === connectionId) {
      this.webcamUser.setVideoSizeBig(!this.webcamUser.isVideoSizeBig());
      return;
    }
    this.screenUser.setVideoSizeBig(!this.screenUser.isVideoSizeBig());
  }

  private initPublisher(targetElement: string | HTMLElement, properties: PublisherProperties): Publisher {
    return this.OV.initPublisher(targetElement, properties);
  }

  private destryoScreenUser() {
    if (this.screenUser?.getStreamManager()) {
      // this.screenUser.getStreamManager().off('streamAudioVolumeChange');
      this.screenUser.getStreamManager().stream.disposeWebRtcPeer();
      this.screenUser.getStreamManager().stream.disposeMediaStream();
    }
  }

  private destryoWebcamUser() {
    if (this.webcamUser?.getStreamManager()) {
      // this.webcamUser.getStreamManager().off('streamAudioVolumeChange');
      this.webcamUser.getStreamManager().stream.disposeWebRtcPeer();
      this.webcamUser.getStreamManager().stream.disposeMediaStream();
    }
  }

  private stopScreenTracks() {
    if (this.screenMediaStream) {
      this.stopAudioTracks(this.screenMediaStream);
      this.stopVideoTracks(this.screenMediaStream);
    }
  }

  // private stopWebcamTracks() {
  // 	if (this.webcamMediaStream) {
  // 		this.stopAudioTracks(this.webcamMediaStream);
  // 		this.stopVideoTracks(this.webcamMediaStream);
  // 	}
  // }

  private stopAudioTracks(mediaStream: MediaStream) {
    mediaStream?.getAudioTracks().forEach(track => {
      track.stop();

      track.enabled = false;
    });
    this.webcamMediaStream?.getAudioTracks().forEach(track => {
      track.stop();
    });
  }

  private stopVideoTracks(mediaStream: MediaStream) {
    mediaStream?.getVideoTracks().forEach(track => {
      track.stop();
    });
  }

  updateNickname(name: string) {
    this.user.user.name = name;
  }

  getUserSession(): OpenviduUserSession {
    return this.user;
  }
}

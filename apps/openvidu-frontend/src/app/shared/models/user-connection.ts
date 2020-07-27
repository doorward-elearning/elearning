import {
  Connection,
  OpenVidu,
  Publisher,
  PublisherProperties,
  Session,
  Stream,
  StreamManager,
  Subscriber,
} from 'openvidu-browser';
import { VideoType } from '../types/video-type';
import { OpenviduUserSession } from '@doorward/common/types/openvidu';

export default class UserConnection {
  private active = false;
  private session: Session;
  private openvidu: OpenVidu;
  private streamManager: StreamManager | undefined;
  private readonly type: VideoType;
  private user: OpenviduUserSession;
  private zoomedIn = false;
  private speaking = false;
  private mediaStream: MediaStream;

  constructor(user: OpenviduUserSession, type: VideoType, active = true) {
    this.active = active;
    this.openvidu = new OpenVidu();
    this.type = type;
    this.user = user;
  }

  updateUser(user: OpenviduUserSession) {
    this.user = user;
  }

  initializeSession() {
    if (this.openvidu) {
      this.session = this.openvidu.initSession();
    }
  }

  initializePublisher(targetElement: string | HTMLElement, properties: PublisherProperties): Publisher {
    const publisher = this.openvidu.initPublisher(targetElement, properties);
    this.streamManager = publisher;

    publisher.once('streamPlaying', () => {});

    publisher.once('accessDenied', () => {});
    return publisher;
  }

  setStreamManager(streamManager: StreamManager) {
    this.streamManager = streamManager;
    this.enable();
  }

  async publish() {
    const publisher = this.getPublisher();
    if (publisher) {
      return await this.session.publish(publisher);
    }
  }

  async unPublish() {
    if (this.streamManager) {
      if (this.isAudioActive()) {
        this.getPublisher().publishAudio(false);
      }
      return this.session.unpublish(this.getPublisher());
    }
  }

  destroy() {
    if (this.streamManager) {
      this.streamManager.stream.disposeWebRtcPeer();
      this.streamManager.stream.disposeMediaStream();
    }
    this.disable();
  }

  getConnectionId() {
    return this.getConnection()?.connectionId;
  }

  getConnection(): Connection {
    return this.getStream()?.connection;
  }

  getStream(): Stream {
    return this.getStreamManager()?.stream;
  }

  getSubscriber() {
    return this.isPublisher() ? null : (this.streamManager as Subscriber);
  }

  isPublisher(): boolean {
    return !!(this.streamManager as Publisher)?.publishVideo;
  }

  getStreamManager(): StreamManager {
    return this.streamManager;
  }

  getPublisher(): Publisher {
    return this.isPublisher() ? (this.streamManager as Publisher) : null;
  }

  async connect(token: string, data: OpenviduUserSession) {
    return await this.session.connect(token, data);
  }

  isAudioActive() {
    return this.getStream()?.audioActive;
  }

  isVideoActive() {
    return this.getStream()?.videoActive;
  }

  isActive(): boolean {
    return this.active;
  }

  enable() {
    this.active = true;
  }

  toggle() {
    this.active = !this.active;
  }

  disable() {
    this.active = false;
  }

  getSession(): Session {
    return this.session;
  }

  isScreen() {
    return this.type === VideoType.SCREEN;
  }

  isWhiteboard() {
    return this.type === VideoType.WHITEBOARD;
  }

  isCamera() {
    return this.type === VideoType.CAMERA;
  }

  getDisplayedName(): string {
    const name = this.user.user.name;
    if (this.isScreen()) {
      return name + "'s screen";
    } else if (this.isWhiteboard()) {
      return 'Whiteboard';
    } else {
      return name;
    }
  }

  zoomIn() {
    this.zoomedIn = true;
  }

  zoomOut() {
    this.zoomedIn = false;
  }

  setZoom(value: boolean) {
    this.zoomedIn = value;
  }

  toggleZoom() {
    this.zoomedIn = !this.zoomedIn;
  }

  isZoomedIn(): boolean {
    return this.zoomedIn;
  }

  isZoomedOut(): boolean {
    return !this.zoomedIn;
  }

  publishAudio(value: boolean) {
    if (this.streamManager) {
      this.getPublisher().publishAudio(value);
    }
  }

  publishVideo(value: boolean) {
    if (this.streamManager) {
      this.getPublisher().publishVideo(value);
    }
  }

  async createMediaStream(properties: PublisherProperties) {
    this.mediaStream = await this.openvidu.getUserMedia(properties);
    await this.getPublisher().replaceTrack(this.mediaStream.getVideoTracks()[0]);
  }

  disconnectSession() {
    if (this.session) {
      this.session.disconnect();
      this.session = null;
    }
  }

  disposeSession() {
    this.session = null;
  }

  stopAudioTracks() {
    this.mediaStream?.getAudioTracks().forEach(track => {
      track.stop();

      track.enabled = false;
    });
  }

  stopVideoTracks() {
    this.mediaStream?.getVideoTracks().forEach(track => {
      track.stop();
    });
  }

  getType(): VideoType {
    return this.type;
  }

  isSpeaking(): boolean {
    return this.speaking;
  }

  setSpeaking(value: boolean) {
    this.speaking = value;
  }
}

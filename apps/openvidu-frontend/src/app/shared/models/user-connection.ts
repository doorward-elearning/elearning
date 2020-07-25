import { Connection, OpenVidu, Publisher, PublisherProperties, Session, Stream, StreamManager } from 'openvidu-browser';
import { VideoType } from '../types/video-type';
import { OpenviduUserSession } from '@doorward/common/types/openvidu';

export default class UserConnection {
  private active = false;
  private session: Session;
  private openvidu: OpenVidu;
  private publisher: Publisher | undefined;
  private readonly type: VideoType;
  private user: OpenviduUserSession;
  private zoomedIn = false;
  private mediaStream: MediaStream;

  constructor(user: OpenviduUserSession, type: VideoType, openvidu: OpenVidu, active = true) {
    this.active = active;
    this.openvidu = openvidu;
    this.type = type;
    this.user = user;
    this.initializeSession();
  }

  updateUser(user: OpenviduUserSession) {
    this.user = user;
  }

  initializeSession() {
    this.session = this.openvidu.initSession();
  }

  initializePublisher(targetElement: string | HTMLElement, properties: PublisherProperties): Publisher {
    const publisher = this.openvidu.initPublisher(targetElement, properties);

    publisher.once('streamPlaying', () => {
      this.publisher = publisher;
    });

    publisher.once('accessDenied', () => {});
    return publisher;
  }

  setPublisher(publisher: Publisher) {
    this.publisher = publisher;
    this.enable();
  }

  async publish() {
    if (this.publisher) {
      return await this.session.publish(this.publisher);
    }
  }

  async unPublish() {
    if (this.publisher) {
      if (this.isAudioActive()) {
        this.publisher.publishAudio(false);
      }
      return this.session.unpublish(this.publisher);
    }
  }

  destroy() {
    if (this.publisher) {
      this.publisher.stream.disposeWebRtcPeer();
      this.publisher.stream.disposeMediaStream();
    }
    this.disable();
  }

  getConnectionId() {
    return this.getConnection().connectionId;
  }

  getConnection(): Connection {
    return this.getStream().connection;
  }

  getStream(): Stream {
    return this.getPublisher().stream;
  }

  getPublisher(): Publisher {
    return this.publisher;
  }

  async connect(token: string, data: OpenviduUserSession) {
    return this.session.connect(token, data);
  }

  isAudioActive() {
    return this.getStream().audioActive;
  }

  isVideoActive() {
    return this.getStream().videoActive;
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
    if (this.publisher) {
      this.publisher.publishAudio(value);
    }
  }

  publishVideo(value: boolean) {
    if (this.publisher) {
      this.publisher.publishVideo(value);
    }
  }

  async createMediaStream(properties: PublisherProperties) {
    this.mediaStream = await this.openvidu.getUserMedia(properties);
    await this.publisher.replaceTrack(this.mediaStream.getVideoTracks()[0]);
  }

  disconnectSession() {
    if (this.session) {
      this.session.disconnect();
      this.session = null;
    }
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
}

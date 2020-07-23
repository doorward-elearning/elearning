import { Connection, OpenVidu, Publisher, PublisherProperties, Session, Stream, StreamManager } from 'openvidu-browser';
import { VideoType } from '../types/video-type';

export default class UserConnection {
  private active = false;
  private openvidu: OpenVidu;
  private session: Session;
  private publisher: Publisher | undefined;
  private readonly type: VideoType;

  constructor(publisher = true, active = false, type: VideoType) {
    this.active = active;
    this.openvidu = new OpenVidu();
    this.type = type;
  }

  initializeSession() {
    this.session = this.openvidu.initSession();
  }

  initializePublisher(targetElement: string | HTMLElement, properties: PublisherProperties): void {
    this.publisher = this.openvidu.initPublisher(targetElement, properties);
  }

  destroy() {
    if (this.publisher) {
      this.publisher.stream.disposeWebRtcPeer();
      this.publisher.stream.disposeMediaStream();
    }
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
}

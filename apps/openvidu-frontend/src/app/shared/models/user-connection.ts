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

  constructor(user: OpenviduUserSession, type: VideoType, openvidu: OpenVidu) {
    this.active = true;
    this.openvidu = openvidu;
    this.type = type;
    this.user = user;
  }

  updateUser(user: OpenviduUserSession) {
    this.user = user;
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
}

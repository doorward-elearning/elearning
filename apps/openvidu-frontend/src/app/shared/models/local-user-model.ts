import { UserModel } from './user-model';
import { VideoType } from '../types/video-type';
import UserConnection from './user-connection';
import { Device, OpenVidu, Publisher, PublisherProperties } from 'openvidu-browser';

export class LocalUserModel extends UserModel {
  private readonly openvidu: OpenVidu;

  constructor() {
    super(null);
    this.openvidu = new OpenVidu();
    this.setConnection(new UserConnection(null, VideoType.CAMERA, true));
    this.setConnection(new UserConnection(null, VideoType.SCREEN, false));
    this.setConnection(new UserConnection(null, VideoType.WHITEBOARD, false));
  }

  initialize() {
    this.forEach(connection => {
      connection.initializeSession();
    });
  }

  public isLocal(): boolean {
    return true;
  }

  public isRemote(): boolean {
    return false;
  }

  public async connect() {
    const { sessionInfo } = this.session;
    await this.getCamera().connect(sessionInfo.webcamToken, this.session);
    await this.getScreen().connect(sessionInfo.screenToken, this.session);
    await this.getWhiteboard().connect(sessionInfo.whiteboardToken, this.session);
  }

  getDevices(): Promise<Device[]> {
    return this.openvidu.getDevices();
  }

  initializePublisher(
    type: VideoType,
    targetElement: string | HTMLElement,
    properties: PublisherProperties
  ): Publisher {
    return this.getConnection(type).initializePublisher(targetElement, properties);
  }

  destroyAll() {
    this.forEach(connection => connection.destroy());
  }

  disconnectAll() {
    this.forEach(connection => {
      connection.disconnectSession();
    });
  }

  getActiveSession(): UserConnection {
    return this.getConnections()
      .map(({ connection }) => connection)
      .find(session => !!session.getSession());
  }
}

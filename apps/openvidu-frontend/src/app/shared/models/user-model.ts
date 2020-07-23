import { VideoType } from '../types/video-type';
import { OPENVIDU_ROLES, OpenviduUserSession } from '@doorward/common/types/openvidu';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import Capabilities from '@doorward/common/utils/Capabilities';
import UserConnection from './user-connection';
import { Device, OpenVidu } from 'openvidu-browser';

/**
 * Packs all the information about the user
 */
export class UserModel {
  session: OpenviduUserSession;

  private readonly connections: Partial<Record<VideoType, UserConnection>>;

  private readonly openvidu: OpenVidu;

  /**
   * @hidden
   */
  constructor(user: OpenviduUserSession) {
    this.openvidu = new OpenVidu();
    this.session = user;
    this.connections = {};
    if (this.hasCamera()) {
      this.connections.CAMERA = new UserConnection(user, VideoType.CAMERA, this.openvidu);
    }
    if (this.hasScreen()) {
      this.connections.SCREEN = new UserConnection(user, VideoType.SCREEN, this.openvidu);
    }
    if (this.hasWhiteboard()) {
      this.connections.WHITEBOARD = new UserConnection(user, VideoType.WHITEBOARD, this.openvidu);
    }
  }

  public updateSession(session: OpenviduUserSession) {
    this.session = session;
    this.forEach(connection => {
      connection.updateUser(session);
    });
  }

  /**
   * Return the user nickname
   */
  public getNickname(): string {
    return this.session?.user?.name;
  }

  /**
   * Return the user avatar
   */
  public getAvatar(): string {
    return this.session?.user?.avatar;
  }

  /**
   * Return `true` if user has a local role and `false` if not
   */
  public isLocal(): boolean {
    return !this.isRemote();
  }

  /**
   * Return `true` if user has a remote role and `false` if not
   */
  public isRemote(): boolean {
    return this.connections.CAMERA.getPublisher().remote;
  }

  public isVideoSizeBig(): boolean {
    return this.videoSizeBig;
  }

  /**
   * @hidden
   */
  public setVideoSizeBig(big: boolean) {
    this.videoSizeBig = big;
  }

  /**
   * @hidden
   */
  public setUserAvatar(img?: string) {
    this.session.user.avatar = img;
  }

  public getRole() {
    return this.session.user.role;
  }

  public isModerator(): boolean {
    return this.session.user.role === OPENVIDU_ROLES.MODERATOR;
  }

  public isSubscriber(): boolean {
    return this.session?.user?.role === OPENVIDU_ROLES.SUBSCRIBER;
  }

  public isPublisher() {
    return this.session?.user?.role === OPENVIDU_ROLES.PUBLISHER;
  }

  public can(capability: MeetingCapabilities): boolean {
    return !!(
      this.session?.sessionConfig?.capabilities?.has && this.session.sessionConfig.capabilities.has(capability)
    );
  }

  public getCapabilities(): Capabilities<typeof MeetingCapabilities> | undefined {
    return this.session?.sessionConfig?.capabilities;
  }

  public addCapability(capability: MeetingCapabilities) {
    if (this.getCapabilities()) {
      this.getCapabilities().add(capability);
    }
  }

  public removeCapability(capability: MeetingCapabilities) {
    if (this.getCapabilities()) {
      this.getCapabilities().remove(capability);
    }
  }

  public toggleCapability(capability: MeetingCapabilities) {
    if (this.getCapabilities()) {
      this.getCapabilities().toggle(capability);
    }
  }

  public hasScreen() {
    return this.can(MeetingCapabilities.SHARE_SCREEN);
  }

  public hasWhiteboard() {
    return this.can(MeetingCapabilities.USE_WHITEBOARD);
  }

  public hasCamera() {
    return this.can(MeetingCapabilities.PUBLISH_VIDEO || MeetingCapabilities.PUBLISH_AUDIO);
  }

  public getCamera(): UserConnection {
    return this.connections.CAMERA;
  }

  public getScreen(): UserConnection {
    return this.connections.SCREEN;
  }

  public getWhiteboard(): UserConnection {
    return this.connections.WHITEBOARD;
  }

  public forEach(callback: (connection: UserConnection, type: VideoType) => void) {
    Object.keys(this.connections).forEach(conn => callback(this.connections[conn], conn as VideoType));
  }

  public getConnections(): Array<{ type: VideoType; connection: UserConnection }> {
    return Object.keys(this.connections).map(conn => ({ type: conn as VideoType, connection: this.connections[conn] }));
  }

  public async connect() {
    return Promise.all(
      this.getConnections().map(async ({ type, connection }) => {
        const { sessionInfo } = this.session;
        const token = {
          [VideoType.WHITEBOARD]: sessionInfo.whiteboardToken,
          [VideoType.SCREEN]: sessionInfo.screenToken,
          [VideoType.CAMERA]: sessionInfo.webcamToken,
        };

        return connection.connect(token[type], this.session);
      })
    );
  }

  getDevices(): Promise<Device[]> {
    return this.openvidu.getDevices();
  }

  getConnectedSession(): UserConnection | null {
    const conn = this.getConnections().find(({ connection }) => connection.isActive());
    return conn ? conn.connection : null;
  }

  isMyOwnConnection(connectionId: string): boolean {
    return !!this.getConnections().find(({ connection }) => connection.getConnectionId() === connectionId);
  }
}

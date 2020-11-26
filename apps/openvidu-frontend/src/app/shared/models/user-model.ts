import { VideoType } from '../types/video-type';
import { OPENVIDU_ROLES, OpenviduUserSession, WhiteboardSessionInfo } from '@doorward/common/types/openvidu';
import UserConnection from './user-connection';
import Capabilities from '@doorward/common/utils/Capabilities';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';

/**
 * Packs all the information about the user
 */
export abstract class UserModel {
  session: OpenviduUserSession;

  private readonly connections: Partial<Record<VideoType, UserConnection>> = {};

  constructor(user: OpenviduUserSession) {
    if (user) {
      this.updateSession(user);
    }
  }

  public setConnection(connection: UserConnection) {
    this.connections[connection.getType()] = connection;
  }

  public getNickname(): string {
    return this.session?.user?.name;
  }

  public getAvatar(): string {
    return this.session?.user?.avatar;
  }

  public updateSession(session: OpenviduUserSession) {
    if(session) {
      if (session.sessionConfig?.capabilities && !session.sessionConfig.capabilities?.has) {
        session.sessionConfig.capabilities = new Capabilities<typeof MeetingCapabilities>(
          MeetingCapabilities,
          (session.sessionConfig.capabilities as any).capabilities
        );
      }
      this.session = session;
      this.forEach(connection => {
        connection.updateUser(session);
      });
    }
  }

  public abstract isLocal(): boolean;
  public abstract isRemote(): boolean;

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
    return this.can(MeetingCapabilities.PUBLISH_WHITEBOARD);
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

  public forEach(callback: (connection: UserConnection, type: VideoType) => void) {
    Object.keys(this.connections).forEach(conn => callback(this.connections[conn], conn as VideoType));
  }

  public getConnections(): Array<{ type: VideoType; connection: UserConnection }> {
    return Object.keys(this.connections).map(conn => ({ type: conn as VideoType, connection: this.connections[conn] }));
  }

  public getConnection(type: VideoType): UserConnection {
    return this.connections[type];
  }

  getConnectedSession(): UserConnection | null {
    const conn = this.getConnections().find(({ connection }) => connection.isActive());
    return conn ? conn.connection : null;
  }

  isMyOwnConnection(connectionId: string): boolean {
    return !!this.getConnections().find(({ connection }) => connection.getConnectionId() === connectionId);
  }

  getByConnectionId(connectionId: string): UserConnection | undefined {
    const conn = this.getConnections().find(({ connection }) => connection.getConnectionId() === connectionId);
    return conn ? conn.connection : undefined;
  }

  connectionEnabled(type: VideoType) {
    return !!this.connections[type];
  }

  cameraEnabled(): boolean {
    return this.getCamera()?.isActive();
  }

  screenEnabled(): boolean {
    return this.getScreen()?.isActive();
  }

  getEnabledConnections(): UserConnection[] {
    return this.getConnections()
      .map(({ connection }) => (connection.isActive() ? connection : null))
      .filter(conn => !!conn);
  }

  isAudioActive(): boolean {
    return this.getCamera().isAudioActive();
  }

  isVideoActive(): boolean {
    return this.getCamera().isVideoActive();
  }

  abstract getActiveSession(): UserConnection;

  removeConnection(type: string) {
    delete this.connections[type];
  }

  isWhiteboardActive(): boolean {
    return this.session?.sessionInfo?.whiteboardSessionInfo?.active;
  }

  getWhiteboardSession(): WhiteboardSessionInfo {
    return this.session?.sessionInfo?.whiteboardSessionInfo;
  }

  getUserId(): string {
    return this.session?.sessionInfo?.userId;
  }

  setWhiteboardSession(whiteboardSession: Partial<WhiteboardSessionInfo>) {
    this.session.sessionInfo.whiteboardSessionInfo = {
      ...this.session.sessionInfo.whiteboardSessionInfo,
      ...whiteboardSession,
    };
  }

  isWhiteboardOwner(): boolean {
    return this.getUserId() && this.getUserId() === this.getWhiteboardSession()?.createdBy;
  }

  isWhiteboardPublisher() {
    return this.can(MeetingCapabilities.PUBLISH_WHITEBOARD);
  }

  getOVSession() {
    return this.session;
  }

  isRaisingHand(): boolean {
    return this.session?.sessionInfo?.raisingHand;
  }

  setRaisingHand(value: boolean) {
    this.session.sessionInfo.raisingHand = value;
  }

  toggleRaisingHand() {
    this.session.sessionInfo.raisingHand = !this.isRaisingHand();
  }
}

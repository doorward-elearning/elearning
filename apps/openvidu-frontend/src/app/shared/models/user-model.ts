import { VideoType } from '../types/video-type';
import { OPENVIDU_ROLES, OpenviduUserSession } from '@doorward/common/types/openvidu';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import Capabilities from '@doorward/common/utils/Capabilities';
import UserConnection from './user-connection';

/**
 * Packs all the information about the user
 */
export class UserModel {
  session: OpenviduUserSession;

  private connections: Partial<Record<VideoType, UserConnection>>;

  /**
   * @hidden
   */
  private videoSizeBig: boolean;

  /**
   * @hidden
   */
  constructor() {
    this.connections = {};
    if (this.hasCamera()) {
      this.connections.CAMERA = new UserConnection(!this.isSubscriber(), true, VideoType.CAMERA);
    }
    if (this.hasScreen()) {
      this.connections.SCREEN = new UserConnection(!this.isSubscriber(), true, VideoType.SCREEN);
    }
    if (this.hasWhiteboard()) {
      this.connections.WHITEBOARD = new UserConnection(!this.isSubscriber(), true, VideoType.WHITEBOARD);
    }
  }

  public updateSession(session: OpenviduUserSession) {
    this.session = session;
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
}

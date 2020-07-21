import { StreamManager, Subscriber } from 'openvidu-browser';
import { VideoType } from '../types/video-type';
import { OPENVIDU_ROLES, OpenviduUserSession } from '@doorward/common/types/openvidu';
import { MeetingCapabilities } from '@doorward/common/types/meetinCapabilities';
import Capabilities from '@doorward/common/utils/Capabilities';

/**
 * Packs all the information about the user
 */
export class UserModel {
  session: OpenviduUserSession;
  /**
   * The Connection ID that is publishing the stream
   */
  connectionId: string;

  /**
   * StreamManager object ([[Publisher]] or [[Subscriber]])
   */
  streamManager: StreamManager;

  /**
   * @hidden
   */
  private videoSizeBig: boolean;

  /**
   * @hidden
   */
  constructor(connectionId?: string, streamManager?: StreamManager, session?: OpenviduUserSession) {
    this.connectionId = connectionId || '';
    this.session = session;
    this.streamManager = streamManager || null;
  }

  /**
   * Return `true` if audio track is active and `false` if audio track is muted
   */
  public isAudioActive(): boolean {
    // console.log("isAudioActive");
    return this.streamManager?.stream?.audioActive;
  }

  public updateSession(session: OpenviduUserSession) {
    this.session = session;
  }

  /**
   * Return `true` if video track is active and `false` if video track is muted
   */
  public isVideoActive(): boolean {
    // console.log("isVideoActive");
    return this.streamManager?.stream?.videoActive;
  }

  /**
   * Return the connection ID
   */
  public getConnectionId(): string {
    return this.streamManager?.stream?.connection?.connectionId;
  }

  /**
   * Return the user nickname
   */
  public getNickname(): string {
    return this.session?.user?.name;
  }

  /**
   * Return the [[streamManger]] object
   */
  public getStreamManager(): StreamManager {
    return this.streamManager;
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
    return this.streamManager?.remote;
  }

  /**
   * Return `true` if user has a screen role and `false` if not
   */
  public isScreen(): boolean {
    // console.log("isScreen");
    return (
      this.streamManager?.stream?.typeOfVideo === VideoType.SCREEN ||
      (this.streamManager as Subscriber)?.stream?.typeOfVideo === VideoType.SCREEN
    );
  }

  /**
   * Return `true` if user has a camera role and `false` if not
   */
  public isCamera(): boolean {
    // console.log("CCC");
    return this.streamManager?.stream?.typeOfVideo === VideoType.CAMERA || (this.isLocal() && !this.isScreen());
  }

  /**
   * Set the streamManager value object
   * @param streamManager value of streamManager
   */
  public setStreamManager(streamManager: StreamManager) {
    this.streamManager = streamManager;
  }

  /**
   * Set the user nickname value
   * @param nickname value of user nickname
   */
  public setNickname(nickname: string) {
    this.session.user.name = nickname;
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
    return this.session.user.role === OPENVIDU_ROLES.SUBSCRIBER;
  }

  public isPublisher() {
    return this.session.user.role === OPENVIDU_ROLES.PUBLISHER;
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
}

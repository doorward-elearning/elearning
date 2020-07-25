import { UserModel } from './user-model';
import { OpenviduUserSession } from '@doorward/common/types/openvidu';
import { VideoType } from '../types/video-type';
import UserConnection from './user-connection';
import { Device, OpenVidu, Publisher, PublisherProperties } from 'openvidu-browser';

export class LocalUserModel extends UserModel {
  private readonly openvidu: OpenVidu;

  constructor(user: OpenviduUserSession) {
    super(user);
    this.openvidu = new OpenVidu();
    this.setConnection(new UserConnection(user, VideoType.CAMERA, this.openvidu, this.hasCamera()));
    this.setConnection(new UserConnection(user, VideoType.SCREEN, this.openvidu, this.hasScreen()));
    this.setConnection(new UserConnection(user, VideoType.WHITEBOARD, this.openvidu, this.hasWhiteboard()));
  }

  public isLocal(): boolean {
    return true;
  }

  public isRemote(): boolean {
    return false;
  }

  public async connect() {
    return Promise.all(
      this.getConnections()
        .filter(conn => !!conn.connection.getPublisher())
        .map(async ({ type, connection }) => {
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
}

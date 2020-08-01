import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../models/user-model';
import { StreamEvent, Subscriber } from 'openvidu-browser';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { OpenviduUserSession } from '@doorward/common/types/openvidu';
import { RemoteUserModel } from '../../models/remote-user-model';
import { VideoType } from '../../types/video-type';
import UserConnection from '../../models/user-connection';

@Injectable({
  providedIn: 'root',
})
export class RemoteUsersService {
  remoteUsers: Observable<RemoteUserModel[]>;
  private _remoteUsers = new BehaviorSubject<RemoteUserModel[]>([]);

  private users: RemoteUserModel[] = [];

  private log: ILogger;

  constructor(private loggerSrv: LoggerService) {
    this.log = this.loggerSrv.get('RemoteService');
    this.remoteUsers = this._remoteUsers.asObservable();
  }

  updateUsers(users = this.users) {
    this._remoteUsers.next(users);
  }

  getRemoteUsers(): Observable<RemoteUserModel[]> {
    return this.remoteUsers;
  }

  private addUser(data: string, subscriber?: Subscriber): RemoteUserModel {
    try {
      if (data.includes('}%/%{')) {
        data = data.substring(0, data.indexOf('}%/%{') + 1);
      }
      const info: OpenviduUserSession = JSON.parse(data);

      // find the user with this information

      const newUser = new RemoteUserModel(info);

      const existingUser = this.users.find(user => user.session.sessionInfo.userId === info.sessionInfo.userId);

      const videoType = subscriber.stream.typeOfVideo as VideoType;
      const connection = new UserConnection(newUser.session, videoType, true);
      connection.setStreamManager(subscriber);
      if (videoType !== VideoType.CAMERA) {
        connection.zoomIn();
      }

      if (existingUser) {
        existingUser.setConnection(connection);
      } else {
        newUser.setConnection(connection);
        this.users.push(newUser);
      }
      this.updateUsers();
      return existingUser ? existingUser : newUser;
    } catch (error) {
      this.log.e(error);
    }
  }

  add(event: StreamEvent, subscriber: Subscriber): RemoteUserModel {
    return this.addUser(event.stream.connection.data, subscriber);
  }

  remove(connectionId: string) {
    const user = this.getRemoteUserByConnectionId(connectionId);
    if (user) {
      const connection = user.getByConnectionId(connectionId);

      user.removeConnection(connection.getType());

      if (Object.keys(user.getConnections()).length === 0) {
        this.removeUser(user);
      }
      this.updateUsers();
    }
  }

  removeUser(user: RemoteUserModel) {
    const index = this.users.indexOf(user, 0);
    if (index > -1) {
      this.users.splice(index, 1);
      this.updateUsers();
    }
  }

  removeUserByConnectionId(connectionId: string) {
    this.log.w('Deleting user: ', connectionId);
    const user = this.getRemoteUserByConnectionId(connectionId);
    const index = this.users.indexOf(user, 0);
    if (index > -1) {
      this.users.splice(index, 1);
      this.updateUsers();
    }
  }

  getWhiteboardOwner(): RemoteUserModel {
    return this.users.find(user => user.isWhiteboardOwner());
  }

  someoneIsSharingScreen(): boolean {
    return this.users.some(user => user.screenEnabled());
  }

  toggleUserZoom(connectionId: string) {
    const user = this.getRemoteUserByConnectionId(connectionId);
    user.getByConnectionId(connectionId).toggleZoom();
  }

  resetUsersZoom() {
    this.users.forEach(u => u.getConnections().forEach(conn => conn.connection.zoomOut()));
  }

  setUserZoom(connectionId: string, zoom: boolean) {
    this.getRemoteUserByConnectionId(connectionId)
      ?.getByConnectionId(connectionId)
      .setZoom(zoom);
  }

  getRemoteUserByConnectionId(connectionId: string): UserModel {
    return this.users.find(u => u.getByConnectionId(connectionId) !== undefined);
  }

  updateNickname(connectionId: any, nickname: any) {
    const user = this.getRemoteUserByConnectionId(connectionId);
    this._remoteUsers.next(this.users);
  }

  clean() {
    this._remoteUsers = new BehaviorSubject([]);
    this.remoteUsers = this._remoteUsers.asObservable();
    this.users = [];
  }

  getUserAvatar(connectionId: string): string {
    return this.getRemoteUserByConnectionId(connectionId).getAvatar();
  }
}

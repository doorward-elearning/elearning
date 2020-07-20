import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../models/user-model';
import { StreamEvent, Subscriber } from 'openvidu-browser';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { OpenviduUserSession } from '@doorward/common/types/openvidu';

@Injectable({
  providedIn: 'root',
})
export class RemoteUsersService {
  remoteUsers: Observable<UserModel[]>;
  private _remoteUsers = <BehaviorSubject<UserModel[]>>new BehaviorSubject([]);

  private users: UserModel[] = [];

  private log: ILogger;

  constructor(private loggerSrv: LoggerService) {
    this.log = this.loggerSrv.get('RemoteService');
    this.remoteUsers = this._remoteUsers.asObservable();
  }

  updateUsers() {
    this._remoteUsers.next(this.users);
  }

  getRemoteUsers(): Observable<UserModel[]> {
    return this.remoteUsers;
  }

  private addUser(connectionId: string, data?: string, subscriber?: Subscriber) {
    try {
      if (data.includes('}%/%{')) {
        data = data.substring(0, data.indexOf('}%/%{') + 1);
      }
      const info: OpenviduUserSession = JSON.parse(data);

      const newUser = new UserModel(connectionId, subscriber, info);
      this.users.push(newUser);
      this.updateUsers();
    } catch (error) {}
  }

  add(event: StreamEvent, subscriber: Subscriber) {
    this.addUser(event.stream.connection.connectionId, event.stream.connection.data, subscriber);
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

  someoneIsSharingScreen(): boolean {
    return this.users.some(user => user.isScreen());
  }

  toggleUserZoom(connectionId: string) {
    const user = this.getRemoteUserByConnectionId(connectionId);
    user.setVideoSizeBig(!user.isVideoSizeBig());
  }

  resetUsersZoom() {
    this.users.forEach(u => u.setVideoSizeBig(false));
  }

  setUserZoom(connectionId: string, zoom: boolean) {
    this.getRemoteUserByConnectionId(connectionId)?.setVideoSizeBig(zoom);
  }

  getRemoteUserByConnectionId(connectionId: string): UserModel {
    return this.users.find(u => u.getConnectionId() === connectionId);
  }

  updateNickname(connectionId: any, nickname: any) {
    const user = this.getRemoteUserByConnectionId(connectionId);
    user?.setNickname(nickname);
    this._remoteUsers.next(this.users);
  }

  clean() {
    this._remoteUsers = <BehaviorSubject<UserModel[]>>new BehaviorSubject([]);
    this.remoteUsers = this._remoteUsers.asObservable();
    this.users = [];
  }

  getUserAvatar(connectionId: string): string {
    return this.getRemoteUserByConnectionId(connectionId).getAvatar();
  }
}

import { UserModel } from './user-model';
import UserConnection from './user-connection';

export class RemoteUserModel extends UserModel {
  isLocal(): boolean {
    return false;
  }

  isRemote(): boolean {
    return true;
  }
  getActiveSession(): UserConnection {
    return this.getConnections().find(connection => connection.connection.isActive())?.connection;
  }
}

import { UserModel } from './user-model';

export class RemoteUserModel extends UserModel {
  isLocal(): boolean {
    return false;
  }

  isRemote(): boolean {
    return true;
  }
}

import { Expose } from 'class-transformer';
import UserModel from '@doorward/common/models/user.model';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class LoginResponse extends DApiResponse {
  @Expose()
  token: string;

  @Expose()
  user: UserModel;
}

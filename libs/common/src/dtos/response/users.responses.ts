import { Expose } from 'class-transformer';
import UserModel from '@doorward/common/models/user.model';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class UserResponse extends DApiResponse {
  @Expose()
  user: UserModel;
}

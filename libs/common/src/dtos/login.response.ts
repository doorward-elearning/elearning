import UserEntity from '../entities/user.entity';
import DApiResponse from '@doorward/common/dtos/d.api.response';

export default class LoginResponse extends DApiResponse {
  token: string;
  user: UserEntity;
}

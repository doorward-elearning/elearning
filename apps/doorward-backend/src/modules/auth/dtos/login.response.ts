import UserEntity from '../../../database/entities/user.entity';

export default class LoginResponse {
  token: string;
  user: UserEntity;
}

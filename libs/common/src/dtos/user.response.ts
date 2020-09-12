import UserEntity from '@doorward/common/entities/user.entity';
import DApiResponse from '@doorward/common/dtos/d.api.response';

export default class UserResponse extends DApiResponse {
  user: UserEntity;
}

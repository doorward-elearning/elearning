import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import UserEntity from '@doorward/common/entities/user.entity';


export default interface UserResponse extends ApiResponse {
  user: UserEntity;
}

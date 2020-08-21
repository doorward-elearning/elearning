import UserEntity from '../../../../apps/doorward-backend/src/database/entities/user.entity';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';

export default interface LoginResponse extends ApiResponse {
  token: string;
  user: UserEntity;
}

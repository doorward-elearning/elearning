import { ApiResponse } from '../services';
import { User } from './index';

export interface LoginResponse extends ApiResponse {
  token: string;
  user: User;
}

import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@edudoor/backend/interceptors/transform.interceptor';

@Injectable()
export class AppService {
  getData(): ApiResponse {
    return [{ message: 'Welcome to edudoor-backend!' }, 'All is well'];
  }
}

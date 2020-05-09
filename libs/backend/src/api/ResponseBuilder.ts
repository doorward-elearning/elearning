import { ApiResponse } from '@edudoor/backend/interceptors/transform.interceptor';
import { HttpStatus } from '@nestjs/common';

export class ResponseBuilder {
  static create<T = any>(
    status = HttpStatus.OK,
    data?: T,
    message?: string,
    errors?: Array<{ [name: string]: string }>,
    meta?: any
  ): ApiResponse<T> {
    return { success: status < 400, data, message, errors, meta, statusCode: status, timestamp: new Date() };
  }
}

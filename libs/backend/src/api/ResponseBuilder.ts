import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import { HttpStatus } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

export class ResponseBuilder {
  static create<T = any>(
    status = HttpStatus.OK,
    data?: T,
    message?: string,
    errors?: Array<{ [name: string]: string }>,
    meta?: any
  ): ApiResponse<T> {
    return {
      success: status < 400,
      ...classToPlain(data),
      message,
      errors,
      meta,
      statusCode: status,
      timestamp: new Date(),
    };
  }
}

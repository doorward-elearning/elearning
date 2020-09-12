import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import { HttpStatus } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

export class ResponseBuilder {
  static create<T = any>(status = HttpStatus.OK, data?: T, groups?: Array<string>): ApiResponse {
    return {
      success: status < 400,
      statusCode: status,
      timestamp: new Date(),
      ...classToPlain(data, { groups }),
    };
  }
}

import { HttpStatus } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import DApiResponse from '@doorward/common/dtos/response';

export class ResponseBuilder {
  static create<T = any>(status = HttpStatus.OK, data?: T, groups?: Array<string>): DApiResponse {
    return {
      success: status < 400,
      statusCode: status,
      timestamp: new Date(),
      ...classToPlain(data, { groups }),
    };
  }
}

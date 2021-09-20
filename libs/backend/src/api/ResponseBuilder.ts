import { HttpStatus } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import DApiResponse from '@doorward/common/dtos/response/base.response';

const handlePromiseValues = async (data: Record<string, any>): Promise<Record<string, any>> => {
  const result = data;

  for (const key in data) {
    if (data[key]) {
      if (typeof data[key] === 'object' && !(typeof data[key]?.then === 'function')) {
        result[key] = await handlePromiseValues(data[key]);
      } else {
        result[key] = await data[key];
      }
    }
  }
  return result;
};

export class ResponseBuilder {
  static async create<T = any>(status = HttpStatus.OK, data?: T, groups?: Array<string>): Promise<DApiResponse> {
    const result = classToPlain(data, { groups });
    return {
      success: status < 400,
      statusCode: status,
      timestamp: new Date(),
      ...(await handlePromiseValues(result)),
    };
  }
}

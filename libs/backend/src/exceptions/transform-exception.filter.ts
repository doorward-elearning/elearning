import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseBuilder } from '@doorward/backend/api/ResponseBuilder';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';

@Catch(HttpException)
@Injectable()
export class TransformExceptionFilter implements ExceptionFilter {
  constructor(private logger: DoorwardLogger) {
    logger.setContext('ExceptionFilter');
  }
  performTransform(exception: HttpException): DApiResponse {
    console.error({ ...exception });
    this.logger.error(exception);
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.BAD_REQUEST;

    const response = exception.getResponse() as any;

    const data = ResponseBuilder.create(status);

    if (exception instanceof ValidationException) {
      data.errors = response;
      data.message = 'Validation error';
    }
    if ((response as string).toLowerCase) {
      data.message = exception.message as string;
    } else {
      if (response.error) {
        data.message = response?.message || response?.error;
      }
    }
    if (exception instanceof ForbiddenException) {
      data.message = 'You do not have sufficient privileges to perform this action.';
    }

    return data;
  }

  catch(exception: HttpException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const data = this.performTransform(exception);

    response.status(data.statusCode).json(data);
  }
}

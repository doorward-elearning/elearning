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
import { PinoLogger } from 'nestjs-pino/dist';
import DApiResponse from '@doorward/common/dtos/response/base.response';

@Catch(HttpException)
@Injectable()
export class TransformExceptionFilter implements ExceptionFilter {
  constructor(private logger: PinoLogger) {
    logger.setContext('ExceptionFilter');
  }
  performTransform(exception: HttpException): DApiResponse {
    console.error(exception);
    this.logger.error(exception.message);
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.BAD_REQUEST;

    const data = ResponseBuilder.create(status);

    if (exception instanceof ValidationException) {
      data.errors = exception.message;
      data.message = 'Validation error';
    }
    if ((exception.message as string).toLowerCase) {
      data.message = exception.message as string;
    } else {
      if (exception.message.error) {
        data.message = exception.message?.message || exception.message?.error;
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

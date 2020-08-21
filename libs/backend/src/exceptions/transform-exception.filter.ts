import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ResponseBuilder } from '@doorward/backend/api/ResponseBuilder';
import ValidationException from '@doorward/backend/exceptions/validation.exception';

@Catch(HttpException)
@Injectable()
export class TransformExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

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

    response.status(status).json(data);
  }
}

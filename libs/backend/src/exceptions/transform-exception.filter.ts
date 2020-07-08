import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ResponseBuilder } from '@doorward/backend/api/ResponseBuilder';

@Catch(HttpException)
@Injectable()
export class TransformExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    const data = ResponseBuilder.create(status);
    if ((exception.message as string).toLowerCase) {
      data.message = exception.message as string;
    } else {
      data.data = exception.message;
      if (data.data.message) {
        data.message = data.data.message;
        delete data.data.message;
      }
      delete data.data.statusCode;
    }

    response.status(status).json(data);
  }
}

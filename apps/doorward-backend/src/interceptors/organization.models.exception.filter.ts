import { ArgumentsHost, Catch, Injectable } from '@nestjs/common';
import TransformException from '@doorward/backend/exceptions/transform.exception';
import { TransformExceptionFilter } from '@doorward/backend/exceptions/transform-exception.filter';
import { Response } from 'express';
import OrganizationModelsTransformInterceptor from './organization.models.transform.interceptor';

@Catch()
@Injectable()
export default class OrganizationModelsExceptionFilter extends TransformExceptionFilter {
  catch(exception: TransformException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const data = OrganizationModelsTransformInterceptor.execute(this.performTransform(exception));

    response.status(data.statusCode).json(data);
  }
}

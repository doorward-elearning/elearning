import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ORGANIZATION } from '../bootstrap/organizationSetup';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import organizationModelsTranslate from '@doorward/common/utils/organizationModelsTranslate';

export default class OrganizationModelsTransformInterceptor<T extends DApiResponse>
  implements NestInterceptor<T, DApiResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<DApiResponse> | Promise<Observable<DApiResponse>> {
    return next.handle().pipe(map(OrganizationModelsTransformInterceptor.execute));
  }

  static execute(response: DApiResponse) {
    if (response?.message) {
      response.message = OrganizationModelsTransformInterceptor.performReplacement(response.message);
    }
    if (response?.errors) {
      Object.keys(response.errors).forEach((error) => {
        response.errors[error] = OrganizationModelsTransformInterceptor.performReplacement(response.errors[error]);
      });
    }
    return response;
  }

  static performReplacement(str: string) {
    return organizationModelsTranslate(str, ORGANIZATION);
  }
}

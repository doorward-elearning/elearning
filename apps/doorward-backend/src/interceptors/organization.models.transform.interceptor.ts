import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ORGANIZATION } from '../bootstrap/organizationSetup';
import DApiResponse from '@doorward/common/dtos/response/base.response';

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
    const regex = /{{(\w+)}}/g;
    let result;
    while ((result = regex.exec(str))) {
      const token = result[0];
      const value = result[1];
      str = str.replace(token, ORGANIZATION.getDisplayName(value));
    }
    return str;
  }
}
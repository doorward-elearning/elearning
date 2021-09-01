import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseBuilder } from '@doorward/backend/api/ResponseBuilder';
import { Reflector } from '@nestjs/core';
import DApiResponse from '@doorward/common/dtos/response/base.response';

@Injectable()
export class TransformInterceptor<T extends DApiResponse> implements NestInterceptor<T, DApiResponse> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<DApiResponse> | Promise<Observable<DApiResponse>> {
    const groups = this.reflector.get<string[]>('transformerGroups', context.getHandler());
    const plainResponse = this.reflector.get('plain-response', context.getHandler());
    return next.handle().pipe(
      map((response) => {
        if (plainResponse) {
          return response;
        }

        if (response) {
          if (!(response as DApiResponse).success) {
            return ResponseBuilder.create(HttpStatus.OK, response, groups);
          }
          return response as DApiResponse;
        } else {
          return ResponseBuilder.create();
        }
      })
    );
  }
}

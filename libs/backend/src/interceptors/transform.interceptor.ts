import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBuilder } from '@doorward/backend/api/ResponseBuilder';
import { Reflector } from '@nestjs/core';

export interface PaginationMetaData {
  pagination: {
    pages: number;
    total: number;
    page: number;
  };
}
export interface ApiResponse {
  success?: boolean;
  statusCode?: number;
  timestamp?: Date;
  message?: string;
  errors?: Array<{ [name: string]: string }>;
  meta?: PaginationMetaData;
  [name: string]: any;
}

@Injectable()
export class TransformInterceptor<T extends ApiResponse> implements NestInterceptor<T, ApiResponse> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ApiResponse> | Promise<Observable<ApiResponse>> {
    const groups = this.reflector.get<string[]>('transformerGroups', context.getHandler());
    return next.handle().pipe(
      map((response) => {
        if (response) {
          if (!(response as ApiResponse).success) {
            return ResponseBuilder.create(HttpStatus.OK, response, groups);
          }
          return response as ApiResponse;
        } else {
          return ResponseBuilder.create();
        }
      })
    );
  }
}

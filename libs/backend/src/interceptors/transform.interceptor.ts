import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBuilder } from '@edudoor/backend/api/ResponseBuilder';

export interface PaginationMetaData {
  pagination: {
    pages: number;
    total: number;
    page: number;
  };
}
export interface ApiResponse<T = any, Meta extends PaginationMetaData = any> {
  success: boolean;
  statusCode: number;
  timestamp: Date;
  data?: T;
  message?: string;
  errors?: Array<{ [name: string]: string }>;
  meta?: Meta;
}

@Injectable()
export class TransformInterceptor<T extends ApiResponse> implements NestInterceptor<T, ApiResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ApiResponse> | Promise<Observable<ApiResponse>> {
    return next.handle().pipe(
      map(response => {
        if (response) {
          if (!(response as ApiResponse).success) {
            return ResponseBuilder.create(HttpStatus.OK, response);
          }
          return response as ApiResponse;
        } else {
          return ResponseBuilder.create();
        }
      })
    );
  }
}

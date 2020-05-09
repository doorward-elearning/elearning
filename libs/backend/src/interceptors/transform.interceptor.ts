import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseBuilder } from '@edudoor/backend/api/ResponseBuilder';

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  timestamp: Date;
  data?: T;
  message?: string;
  errors?: Array<{ [name: string]: string }>;
  meta?: any;
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

import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type ApiResponse = [any?, string?, any?];

interface CustomResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ [name: string]: string }>;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T extends ApiResponse> implements NestInterceptor<T, CustomResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<CustomResponse<T>> | Promise<Observable<CustomResponse<T>>> {
    return next.handle().pipe(
      map(response => {
        const result: CustomResponse<any> = { success: true };
        if (response.length) {
          const [data, message, meta] = response;

          result.data = data;
          if (message) {
            result.message = message;
          }
          if (meta) {
            result.meta = meta;
          }
        } else {
          result.data = response;
        }
        return result;
      }),
      catchError((err: HttpException) => {
        throw new HttpException(
          {
            success: false,
            message: err.message,
          },
          err.getStatus ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        );
      })
    );
  }
}

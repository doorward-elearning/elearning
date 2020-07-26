import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  private baseUrl: string;

  constructor(@Inject('BASE_API_URL') private _baseUrl: BehaviorSubject<string>) {
    _baseUrl.subscribe(value => {
      this.baseUrl = value;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq = request.clone({ url: `${this.baseUrl}${request.url}` });

    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      apiReq = apiReq.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwtToken,
        },
      });
    }

    return next.handle(apiReq);
  }
}

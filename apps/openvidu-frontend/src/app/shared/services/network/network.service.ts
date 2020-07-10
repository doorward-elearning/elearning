import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { CreateTokenResponse } from '../../../../../../openvidu-backend/src/services/openvidu/openvidu.service';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private log: ILogger;

  constructor(private http: HttpClient, private loggerSrv: LoggerService) {
    this.log = this.loggerSrv.get('NetworkService');
  }

  async getToken(sessionId: string, openviduServerApiUrl?: string): Promise<string> {
    try {
      this.log.d('Getting token from backend');
      const response = await this.http
        .post<ApiResponse<CreateTokenResponse>>(openviduServerApiUrl + 'call', { sessionId })
        .toPromise();

      return response.data.token;
    } catch (error) {
      if (error.status === 404) {
        throw { status: error.status, message: 'Cannot connect with backend. ' + error.url + ' not found' };
      }
      throw error;
    }
  }
}

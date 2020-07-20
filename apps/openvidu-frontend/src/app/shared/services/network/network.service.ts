import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import { OpenviduUser, OpenviduUserSession } from '@doorward/common/types/openvidu';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private log: ILogger;

  constructor(private http: HttpClient, private loggerSrv: LoggerService) {
    this.log = this.loggerSrv.get('NetworkService');
  }

  async getToken(sessionId: string, user: OpenviduUser): Promise<OpenviduUserSession> {
    try {
      this.log.d('Getting token from backend');
      const response = await this.http
        .post<ApiResponse<OpenviduUserSession>>('call', { sessionId, user })
        .toPromise();

      localStorage.setItem('jwtToken', response.data.jwtToken);

      return response.data;
    } catch (error) {
      if (error.status === 404) {
        throw { status: error.status, message: 'Cannot connect with backend. ' + error.url + ' not found' };
      }
      throw error;
    }
  }
}

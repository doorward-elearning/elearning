import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import { CreateTokenResponse } from '@doorward/common/types/openvidu';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private log: ILogger;
  private baseUrl: string;

  constructor(private http: HttpClient, private loggerSrv: LoggerService) {
    this.log = this.loggerSrv.get('NetworkService');
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  async getToken(sessionId: string, role: string): Promise<string> {
    try {
      this.log.d('Getting token from backend');
      const response = await this.http
        .post<ApiResponse<CreateTokenResponse>>(this.baseUrl + 'call', { sessionId, role })
        .toPromise();

      return response.data.token;
    } catch (error) {
      if (error.status === 404) {
        throw { status: error.status, message: 'Cannot connect with backend. ' + error.url + ' not found' };
      }
      throw error;
    }
  }

  async muteAllParticipants(sessionId: string, permanent = false) {
    return this.http.post(this.baseUrl + 'signals/audio/mute-all', { sessionId, permanent }).toPromise();
  }
}

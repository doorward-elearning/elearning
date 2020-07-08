import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../http-client/http-client.service';
import { OPENVIDU_ROLES } from '@doorward/common/types/openvidu';

const openviduUrl = process.env.OPENVIDU_URL;

@Injectable()
export class OpenviduService {
  constructor(private httpClientService: HttpClientService) {}
  public async createSession(sessionId: string): Promise<CreateSessionResponse> {
    const url = openviduUrl + '/api/sessions';
    console.log('Requesting session to ', url);
    const body: string = JSON.stringify({ customSessionId: sessionId });

    return await this.httpClientService.post<CreateSessionResponse>(url, body);
  }

  public async createToken(sessionId: string): Promise<CreateTokenResponse> {
    const url = openviduUrl + '/api/tokens';
    console.log('Requesting token to ', url);
    const body: string = JSON.stringify({ session: sessionId });

    return await this.httpClientService.post<CreateTokenResponse>(url, body);
  }
}

export interface CreateSessionResponse {
  id: string;
  createdAt: string;
}

export interface CreateTokenResponse {
  id: string;
  session: string;
  role: OPENVIDU_ROLES;
  data: string;
  token: string;
  kurentoOptions?: {
    videoMaxRecvBandwidth: number;
    videoMinRecvBandwidth: number;
    videoMaxSendBandwidth: number;
    videoMinSendBandwidth: number;
    allowedFilters: Array<string>;
  };
}

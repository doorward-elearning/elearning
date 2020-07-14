import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../http-client/http-client.service';
import { OPENVIDU_ROLES } from '@doorward/common/types/openvidu';

@Injectable()
export class OpenviduService {
  constructor(private httpClientService: HttpClientService) {}
  public async createSession(sessionId: string): Promise<CreateSessionResponse> {
    const body: string = JSON.stringify({ customSessionId: sessionId });

    return await this.httpClientService.post<CreateSessionResponse>('/api/sessions', body);
  }

  public async createToken(sessionId: string): Promise<CreateTokenResponse> {
    const body: string = JSON.stringify({ session: sessionId });

    return await this.httpClientService.post<CreateTokenResponse>('/api/tokens', body);
  }

  public async deleteSession(sessionId: string): Promise<DeleteSessionResponse> {
    return await this.httpClientService.delete<DeleteSessionResponse>('/api/sessions/' + sessionId);
  }
}

export interface CreateSessionResponse {
  id: string;
  createdAt: string;
}

export interface DeleteSessionResponse {}

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

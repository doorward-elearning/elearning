import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../http-client/http-client.service';
import {
  CreateSessionResponse,
  CreateTokenBody,
  OpenviduSessionResponse,
  DeleteSessionResponse,
  SessionInfoResponse,
  SessionsInfoResponse,
  OpenviduConnection,
  OpenviduUserSession,
} from '@doorward/common/types/openvidu';

@Injectable()
export class OpenviduService {
  constructor(private httpClientService: HttpClientService) {}
  public async createSession(sessionId: string): Promise<CreateSessionResponse> {
    const body: string = JSON.stringify({ customSessionId: sessionId });

    return await this.httpClientService.post<CreateSessionResponse>('/api/sessions', body);
  }

  public async createToken(data: CreateTokenBody): Promise<OpenviduSessionResponse> {
    const body: string = JSON.stringify(data);

    return await this.httpClientService.post<OpenviduSessionResponse>('/api/tokens', body);
  }

  public async deleteSession(sessionId: string): Promise<DeleteSessionResponse> {
    return await this.httpClientService.delete<DeleteSessionResponse>('/api/sessions/' + sessionId);
  }

  public async getSessionInfo(sessionId: string): Promise<SessionInfoResponse> {
    return await this.httpClientService.get<SessionInfoResponse>('/api/sessions/' + sessionId);
  }

  public async getSessionsInfo(): Promise<SessionsInfoResponse> {
    return await this.httpClientService.get('/api/sessions');
  }

  public async getAllParticipants(sessionId: string): Promise<Array<OpenviduConnection>> {
    return (await this.getSessionInfo(sessionId)).connections.content;
  }

  public isMyConnection(connection: OpenviduConnection, user: OpenviduUserSession) {
    return connection.token === user.sessionInfo.screenToken || connection.token === user.sessionInfo.webcamToken;
  }

  public async sendSignal<T>(sessionId: string, type: string, data?: T, to?: Array<string>) {
    const body: string = JSON.stringify({
      session: sessionId,
      to,
      type,
      data: JSON.stringify(data),
    });
    return await this.httpClientService.post('/api/signal', body);
  }
}

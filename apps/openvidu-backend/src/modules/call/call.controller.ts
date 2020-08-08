import { Body, Controller, Delete, Post } from '@nestjs/common';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { DeleteSessionResponse } from '@doorward/common/types/openvidu';
import { AuthService } from '../auth/auth.service';
import { CreateMeetingBody, CreateMeetingResponse } from '@doorward/backend/dto/openviduBackend';
import CallService from './call.service';

@Controller('call')
export class CallController {
  constructor(
    private openviduService: OpenviduService,
    private authService: AuthService,
    private callService: CallService
  ) {}

  /**
   * Creates a session, if the user is a moderator and generates an openvidu token and user session information
   * @param body
   */
  @Post()
  async createSession(@Body() body: CreateMeetingBody): Promise<CreateMeetingResponse> {
    const userSession = await this.callService.createSession(body);
    const jwtToken = await this.authService.generateAccessToken(userSession);

    return {
      ...userSession,
      jwtToken,
    };
  }

  @Delete()
  async endSession(@Body('sessionId') sessionId: string): Promise<DeleteSessionResponse> {
    return await this.openviduService.deleteSession(sessionId);
  }
}

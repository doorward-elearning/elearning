import { Body, Controller, Delete, HttpException, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { AxiosError } from 'axios';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import {
  DeleteSessionResponse,
  MeetingRoles,
  OpenviduUser,
  OpenviduUserSession,
  SessionConfig,
} from '@doorward/common/types/openvidu';
import { AuthService } from '../auth/auth.service';
import Tools from '@doorward/common/utils/Tools';

@Controller('call')
export class CallController {
  constructor(private openviduService: OpenviduService, private authService: AuthService) {}

  static handleError(error: AxiosError) {
    const statusCode = error.response?.status;

    if (error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT' || (error.code || '').includes('SELF_SIGNED_CERT')) {
      throw new HttpException(
        'ERROR: Self signed certificate Visit ' + process.env.OPENVIDU_URL,
        HttpStatus.UNAUTHORIZED
      );
    } else {
      throw new HttpException(
        error.message || 'ERROR: Cannot connect with OpenVidu Server',
        statusCode || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Post()
  async createSession(
    @Body('sessionId') sessionId: string,
    @Body('user') user: OpenviduUser,
    @Body('sessionConfig') sessionConfig: SessionConfig
  ): Promise<OpenviduUserSession> {
    let id = sessionId;
    try {
      try {
        await this.openviduService.getSessionInfo(sessionId);
      } catch (error) {
        if (error.response?.status === 404) {
          if (user.role === MeetingRoles.MODERATOR) {
            const response = await this.openviduService.createSession(sessionId);
            id = response.id;
          } else {
            throw new NotFoundException('The session does not exist.');
          }
        }
      }
    } catch (error) {
      if (error.response?.status !== 409) {
        CallController.handleError(error);
      }
    }

    try {
      const webcamToken = await this.openviduService.createToken({
        session: id,
        role: user.role,
        data: JSON.stringify(user),
      });
      const screenToken = await this.openviduService.createToken({
        session: id,
        role: user.role,
        data: JSON.stringify(user),
      });

      const userSession: OpenviduUserSession = {
        user,
        sessionInfo: {
          webcamToken: webcamToken.token,
          screenToken: screenToken.token,
          connectionId: `conn_${Tools.randomString(10)}`,
          role: user.role,
          session: sessionId,
        },
        sessionConfig,
      };

      const jwtToken = await this.authService.generateAccessToken(userSession);
      return {
        ...userSession,
        jwtToken,
      };
    } catch (error) {
      CallController.handleError(error);
    }
  }

  @Delete()
  async endSession(@Body('sessionId') sessionId: string): Promise<DeleteSessionResponse> {
    try {
      return await this.openviduService.deleteSession(sessionId);
    } catch (error) {
      CallController.handleError(error);
    }
  }
}

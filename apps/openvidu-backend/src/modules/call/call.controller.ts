import { Body, Controller, Delete, HttpException, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { AxiosError } from 'axios';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { DeleteSessionResponse, OPENVIDU_ROLES, OpenviduUserSession } from '@doorward/common/types/openvidu';
import { AuthService } from '../auth/auth.service';
import Tools from '@doorward/common/utils/Tools';
import { CreateSessionBody } from '@doorward/backend/dto/openviduBackend';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import Capabilities from '@doorward/common/utils/Capabilities';

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

  /**
   * Creates a session, if the user is a moderator and generates an openvidu token and user session information
   * @param body
   */
  @Post()
  async createSession(@Body() body: CreateSessionBody): Promise<OpenviduUserSession> {
    const { sessionId, user, sessionConfig } = body;
    let id = sessionId;
    try {
      try {
        await this.openviduService.getSessionInfo(sessionId);
      } catch (error) {
        if (error.response?.status === 404) {
          if (user.role === OPENVIDU_ROLES.MODERATOR) {
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

    sessionConfig.capabilities = new Capabilities<typeof MeetingCapabilities>(
      MeetingCapabilities,
      (sessionConfig.capabilities as any).capabilities
    );

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
          userId: `user_${Tools.randomString(20)}`,
          whiteboardSessionInfo: {
            active: false,
            createdBy: null,
          },
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

import { Body, Controller, Delete, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AxiosError } from 'axios';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { CreateTokenResponse, DeleteSessionResponse, OPENVIDU_ROLES } from '@doorward/common/types/openvidu';

@Controller('call')
export class CallController {
  constructor(private openviduService: OpenviduService) {}

  static handleError(error: AxiosError) {
    console.error(error.response?.data);
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
    @Body('role') role: OPENVIDU_ROLES
  ): Promise<CreateTokenResponse> {
    let id = sessionId;
    try {
      const response = await this.openviduService.createSession(sessionId);
      id = response.id;
    } catch (error) {
      if (error.response?.status !== 409) {
        CallController.handleError(error);
      }
    }
    try {
      return this.openviduService.createToken({
        session: id,
        role,
      });
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

  @Post()
  async muteAllParticipants(): Promise<void> {}
}

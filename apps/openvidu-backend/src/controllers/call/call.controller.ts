import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateTokenResponse, OpenviduService } from '../../services/openvidu/openvidu.service';
import { AxiosError } from 'axios';

@Controller('call')
export class CallController {
  constructor(private openviduService: OpenviduService) {}

  static handleError(error: AxiosError) {
    console.error(error.response.data);
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
  async createSession(@Body('sessionId') sessionId: string): Promise<CreateTokenResponse> {
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
      return this.openviduService.createToken(id);
    } catch (error) {
      CallController.handleError(error);
    }
  }
}

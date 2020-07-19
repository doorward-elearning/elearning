import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignalsService } from './signals.service';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('signals')
export class SignalsController {
  constructor(private signalsService: SignalsService) {}

  @Post('/audio/mute-all')
  async muteAllParticipants(
    @CurrentUser() user,
    @Body('sessionId') sessionId: string,
    @Body('permanent') permanent: boolean
  ) {
    return this.signalsService.sendSignal(sessionId, SignalTypes.MUTE_AUDIO, user, { permanent });
  }

  @Post('/audio/unmute-all')
  async unmuteAllParticipants(@Body('sessionId') sessionId: string, @CurrentUser() user) {
    return this.signalsService.sendSignal(sessionId, SignalTypes.UNMUTE_AUDIO, user);
  }

  @Post('/video/mute-all')
  async muteAllParticipantsVideo(
    @CurrentUser() user,
    @Body('sessionId') sessionId: string,
    @Body('permanent') permanent: boolean
  ) {
    return this.signalsService.sendSignal(sessionId, SignalTypes.MUTE_VIDEO, user, { permanent });
  }

  @Post('/video/unmute-all')
  async unmuteAllParticipantsVideo(@Body('sessionId') sessionId: string, @CurrentUser() user) {
    return this.signalsService.sendSignal(sessionId, SignalTypes.UNMUTE_VIDEO, user);
  }
}

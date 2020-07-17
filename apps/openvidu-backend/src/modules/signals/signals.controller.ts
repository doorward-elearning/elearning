import { Body, Controller, Post } from '@nestjs/common';
import { SignalsService } from './signals.service';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';

@Controller('signals')
export class SignalsController {
  constructor(private signalsService: SignalsService) {}

  @Post('/audio/mute-all')
  async muteAllParticipants(@Body('sessionId') sessionId: string, @Body('permanent') permanent: boolean) {
    return this.signalsService.sendSignal(sessionId, SignalTypes.MUTE_AUDIO, { permanent });
  }

  @Post('/audio/unmute-all')
  async unmuteAllParticipants(@Body('sessionId') sessionId: string) {
    return this.signalsService.sendSignal(sessionId, SignalTypes.UNMUTE_AUDIO);
  }

  @Post('/video/mute-all')
  async muteAllParticipantsVideo(@Body('sessionId') sessionId: string, @Body('permanent') permanent: boolean) {
    return this.signalsService.sendSignal(sessionId, SignalTypes.MUTE_VIDEO, { permanent });
  }

  @Post('/video/unmute-all')
  async unmuteAllParticipantsVideo(@Body('sessionId') sessionId: string) {
    return this.signalsService.sendSignal(sessionId, SignalTypes.UNMUTE_VIDEO);
  }
}

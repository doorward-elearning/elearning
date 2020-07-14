import { Body, Controller, Post } from '@nestjs/common';
import { SignalsService } from './signals.service';

@Controller('signals')
export class SignalsController {
  constructor(private signalsService: SignalsService) {}

  @Post('/audio/mute-all')
  async muteAllParticipants(@Body('sessionId') sessionId: string, @Body('permanent') permanent: boolean) {
    return this.signalsService.muteAllParticipants(sessionId, permanent);
  }
}

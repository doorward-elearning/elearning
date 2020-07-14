import { Module } from '@nestjs/common';
import { SignalsController } from './signals.controller';
import { SignalsService } from './signals.service';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { HttpClientService } from '../../services/http-client/http-client.service';

@Module({
  controllers: [SignalsController],
  providers: [SignalsService, OpenviduService, HttpClientService],
})
export class SignalsModule {}

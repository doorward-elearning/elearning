import { Module } from '@nestjs/common';
import { CallController } from '../controllers/call/call.controller';
import { OpenviduService } from '../services/openvidu/openvidu.service';
import { HttpClientService } from '../services/http-client/http-client.service';

@Module({
  imports: [],
  controllers: [CallController],
  providers: [OpenviduService, HttpClientService],
})
export class AppModule {}

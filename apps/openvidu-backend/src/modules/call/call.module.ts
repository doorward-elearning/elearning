import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { SignalsService } from '../signals/signals.service';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { HttpClientService } from '../../services/http-client/http-client.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { StorageService } from '../../services/storage/storage.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [CallController],
  providers: [SignalsService, OpenviduService, HttpClientService, StorageService],
})
export class CallModule {}

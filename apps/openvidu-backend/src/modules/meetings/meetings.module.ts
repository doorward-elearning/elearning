import { Module } from '@nestjs/common';
import { MeetingsController } from './meetings.controller';
import { SignalsService } from '../signals/signals.service';
import { OpenviduService } from '../../services/openvidu/openvidu.service';
import { HttpClientService } from '../../services/http-client/http-client.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { StorageService } from '../../services/storage/storage.service';
import MeetingsService from './meetings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapabilityEntity } from '../../database/entities/capability.entity';
import MeetingEntity from '../../database/entities/meeting.entity';
import UserEntity from '../../database/entities/user.entity';
import WhiteboardEntity from '../../database/entities/whiteboard.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([CapabilityEntity, MeetingEntity, UserEntity, WhiteboardEntity]),
  ],
  controllers: [MeetingsController],
  providers: [SignalsService, OpenviduService, HttpClientService, StorageService, MeetingsService],
})
export class MeetingsModule {}

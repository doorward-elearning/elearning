import { Module } from '@nestjs/common';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';
import { JitsiModule } from '../jitsi/jitsi.module';

@Module({
  imports: [, MeetingRoomsModule, JitsiModule],
  controllers: [MeetingsController],
  providers: [MeetingsService],
  exports: [MeetingsService],
})
export class MeetingsModule {}

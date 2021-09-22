import { Module } from '@nestjs/common';
import { MeetingRoomsService } from './meeting-rooms.service';
import { MeetingRoomsController } from './meeting-rooms.controller';

@Module({
  imports: [],
  providers: [MeetingRoomsService],
  controllers: [MeetingRoomsController],
  exports: [MeetingRoomsService],
})
export class MeetingRoomsModule {}

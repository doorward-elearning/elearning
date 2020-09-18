import { Module } from '@nestjs/common';
import { MeetingRoomsService } from './meeting-rooms.service';
import { MeetingRoomsController } from './meeting-rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import MeetingRoomRepository from '@repositories/meeting.room.repository';
import MeetingRoomMemberRepository from '@repositories/meeting.room.member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingRoomRepository, MeetingRoomMemberRepository])],
  providers: [MeetingRoomsService],
  controllers: [MeetingRoomsController],
  exports: [MeetingRoomsService],
})
export class MeetingRoomsModule {}

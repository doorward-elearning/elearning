import { Module } from '@nestjs/common';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import MeetingsRepository from '@repositories/meetings.repository';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingsRepository]), MeetingRoomsModule],
  controllers: [MeetingsController],
  providers: [MeetingsService],
  exports: [MeetingsService],
})
export class MeetingsModule {}

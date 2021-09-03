import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';
import { MeetingsModule } from '../meetings/meetings.module';

@Module({
  imports: [, MeetingRoomsModule, MeetingsModule],
  controllers: [SchoolsController],
  providers: [SchoolsService],
  exports: [SchoolsService],
})
export class SchoolsModule {}

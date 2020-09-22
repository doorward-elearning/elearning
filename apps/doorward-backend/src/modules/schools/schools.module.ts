import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { SchoolRepository } from '@repositories/school.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';
import { MeetingsModule } from '../meetings/meetings.module';
import { ClassroomRepository } from '@repositories/classroom.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolRepository, ClassroomRepository]), MeetingRoomsModule, MeetingsModule],
  controllers: [SchoolsController],
  providers: [SchoolsService],
  exports: [SchoolsService],
})
export class SchoolsModule {}

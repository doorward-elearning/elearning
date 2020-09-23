import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';
import RolesRepository from '@doorward/backend/repositories/roles.repository';
import StudentCoursesRepository from '@doorward/backend/repositories/student.courses.repository';
import MeetingRoomEntity from '@doorward/common/entities/meeting.room.entity';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';
import { StudentsRepository } from '@doorward/backend/repositories/students.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CoursesRepository,
      StudentsRepository,
      RolesRepository,
      StudentCoursesRepository,
      MeetingRoomEntity,
    ]),
    MeetingRoomsModule,
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}

import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoursesRepository from '@repositories/courses.repository';
import { UsersRepository } from '@repositories/users.repository';
import RolesRepository from '@repositories/roles.repository';
import StudentCoursesRepository from '@repositories/student.courses.repository';
import MeetingRoomEntity from '@doorward/common/entities/meeting.room.entity';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CoursesRepository,
      UsersRepository,
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

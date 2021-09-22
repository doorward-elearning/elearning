import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MeetingRoomsModule } from '../meeting-rooms/meeting-rooms.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MeetingRoomsModule, UsersModule],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}

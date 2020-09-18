import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoursesRepository from '@repositories/courses.repository';
import { UsersRepository } from '@repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository, UsersRepository])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}

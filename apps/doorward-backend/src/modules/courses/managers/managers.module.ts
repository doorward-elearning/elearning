import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CourseManagerRepository from '@repositories/course.manager.repository';
import CoursesRepository from '@repositories/courses.repository';
import { UsersRepository } from '@repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CourseManagerRepository, CoursesRepository, UsersRepository])],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}

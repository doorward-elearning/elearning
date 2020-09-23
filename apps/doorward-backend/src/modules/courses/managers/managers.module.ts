import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CourseManagerRepository from '@doorward/backend/repositories/course.manager.repository';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CourseManagerRepository, CoursesRepository, UsersRepository])],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}

import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';
import TeacherRepository from '@doorward/backend/repositories/teacher.repository';
import { StudentsRepository } from '@doorward/backend/repositories/students.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository, TeacherRepository, StudentsRepository])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}

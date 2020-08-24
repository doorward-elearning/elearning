import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { ModulesModule } from '../modules/modules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoursesRepository from '../../repositories/courses.repository';

@Module({
  imports: [ModulesModule, TypeOrmModule.forFeature([CoursesRepository])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}

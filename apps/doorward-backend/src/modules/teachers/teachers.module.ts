import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TeacherRepository from '@doorward/backend/repositories/teacher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository]), UsersService],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}

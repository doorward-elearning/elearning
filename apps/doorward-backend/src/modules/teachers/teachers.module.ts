import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TeacherRepository from '@doorward/backend/repositories/teacher.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository]), UsersModule],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}

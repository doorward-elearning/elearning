import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { RolesModule } from '../roles/roles.module';
import ProfileController from './profile.controller';
import PasswordResetsRepository from './password.resets.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, PasswordResetsRepository]), RolesModule],
  providers: [UsersService],
  controllers: [UsersController, ProfileController],
  exports: [UsersService],
})
export class UsersModule {}

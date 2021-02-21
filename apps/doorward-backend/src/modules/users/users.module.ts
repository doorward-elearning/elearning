import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { RolesModule } from '../roles/roles.module';
import ProfileController from './profile.controller';
import PasswordResetsRepository from '@doorward/backend/repositories/password.resets.repository';
import PrivilegeRepository from '@doorward/backend/repositories/privilege.repository';
import { FilesModule } from '../files/files.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, PasswordResetsRepository, PrivilegeRepository]),
    RolesModule,
    FilesModule,
  ],
  providers: [UsersService],
  controllers: [UsersController, ProfileController],
  exports: [UsersService],
})
export class UsersModule {}

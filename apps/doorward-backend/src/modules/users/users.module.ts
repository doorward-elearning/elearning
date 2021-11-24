import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module';
import ProfileController from './profile.controller';
import { FilesModule } from '../files/files.module';
import { UserSessionRepository } from '@doorward/backend/repositories/user.session.repository';

@Module({
  imports: [RolesModule, FilesModule],
  providers: [UsersService, UserSessionRepository],
  controllers: [UsersController, ProfileController],
  exports: [UsersService],
})
export class UsersModule {}

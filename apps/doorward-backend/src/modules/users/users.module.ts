import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module';
import ProfileController from './profile.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [RolesModule, FilesModule],
  providers: [UsersService],
  controllers: [UsersController, ProfileController],
  exports: [UsersService],
})
export class UsersModule {}

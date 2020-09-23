import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import GroupsRepository from '@doorward/backend/repositories/groups.repository';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import GroupMembersRepository from '@doorward/backend/repositories/group.members.repository';
import GroupsUtils from './groups.utils';

@Module({
  imports: [TypeOrmModule.forFeature([GroupsRepository, UsersRepository, GroupMembersRepository])],
  controllers: [GroupsController],
  providers: [GroupsService, GroupsUtils],
  exports: [GroupsService],
})
export class GroupsModule {}

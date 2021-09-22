import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import GroupsUtils from './groups.utils';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, GroupsUtils],
  exports: [GroupsService],
})
export class GroupsModule {}

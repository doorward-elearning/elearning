import { Module } from '@nestjs/common';
import { DiscussionGroupsController } from './discussion-groups.controller';
import { DiscussionGroupsService } from './discussion-groups.service';

@Module({
  imports: [],
  controllers: [DiscussionGroupsController],
  providers: [DiscussionGroupsService],
  exports: [DiscussionGroupsService],
})
export class DiscussionGroupsModule {}

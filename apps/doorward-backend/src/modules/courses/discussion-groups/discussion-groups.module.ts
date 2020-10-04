import { Module } from '@nestjs/common';
import { DiscussionGroupsController } from './discussion-groups.controller';
import { DiscussionGroupsService } from './discussion-groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DiscussionGroupRepository from '@doorward/backend/repositories/discussion.group.repository';
import DiscussionCommentRepository from '@doorward/backend/repositories/discussion.comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiscussionGroupRepository, DiscussionCommentRepository])],
  controllers: [DiscussionGroupsController],
  providers: [DiscussionGroupsService],
  exports: [DiscussionGroupsService],
})
export class DiscussionGroupsModule {}

import DApiResponse from '@doorward/common/dtos/response/base.response';
import DiscussionGroupEntity from '@doorward/common/entities/discussion.group.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import DiscussionCommentEntity from '@doorward/common/entities/discussion.comment.entity';

export class DiscussionGroupResponse extends DApiResponse {
  @Expose()
  discussionGroup: DiscussionGroupEntity;
}

export class DiscussionGroupsResponse extends DApiResponse {
  @Expose()
  discussionGroups: DiscussionGroupEntity[];
}

export class DiscussionCommentResponse extends DApiResponse {
  @Expose()
  discussionComment: DiscussionCommentEntity;
}

export class DiscussionCommentsResponse extends DApiResponse {
  @Expose()
  discussionComments: DiscussionCommentEntity[];
}

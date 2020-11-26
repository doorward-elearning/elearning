import DApiResponse from '@doorward/common/dtos/response/base.response';
import DiscussionGroupEntity from '@doorward/common/entities/discussion.group.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import DiscussionCommentEntity from '@doorward/common/entities/discussion.comment.entity';

export class DiscussionGroupResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  discussionGroup: DiscussionGroupEntity;
}

export class DiscussionGroupsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  discussionGroups: DiscussionGroupEntity[];
}

export class DiscussionCommentResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  discussionComment: DiscussionCommentEntity;
}

export class DiscussionCommentsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  discussionComments: DiscussionCommentEntity[];
}

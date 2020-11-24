import DApiResponse from '@doorward/common/dtos/response/base.response';
import DiscussionGroupModel from '@doorward/common/models/discussion.group.model';
import { Expose } from 'class-transformer';
import DiscussionCommentModel from '@doorward/common/models/discussion.comment.model';

export class DiscussionGroupResponse extends DApiResponse {
  @Expose()
  discussionGroup: DiscussionGroupModel;
}

export class DiscussionGroupsResponse extends DApiResponse {
  @Expose()
  discussionGroups: DiscussionGroupModel[];
}

export class DiscussionCommentResponse extends DApiResponse {
  @Expose()
  discussionComment: DiscussionCommentModel;
}

export class DiscussionCommentsResponse extends DApiResponse {
  @Expose()
  discussionComments: DiscussionCommentModel[];
}

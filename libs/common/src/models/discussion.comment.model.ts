import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import UserModel from '@doorward/common/models/user.model';
import DiscussionGroupModel from '@doorward/common/models/discussion.group.model';

export default interface DiscussionCommentModel extends BaseOrganizationModel{
  comment: string;
  author: UserModel;
  discussionGroup: DiscussionGroupModel;
}

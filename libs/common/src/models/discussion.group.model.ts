import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import CourseModel from '@doorward/common/models/course.model';
import UserModel from '@doorward/common/models/user.model';
import DiscussionCommentModel from '@doorward/common/models/discussion.comment.model';

export default interface DiscussionGroupModel extends BaseOrganizationModel {
  title: string;
  description: string;
  course: CourseModel;
  creator: UserModel;
  comments: DiscussionCommentModel[];
}

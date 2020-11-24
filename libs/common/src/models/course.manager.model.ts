import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import UserModel from '@doorward/common/models/user.model';
import CourseModel from '@doorward/common/models/course.model';

export default interface CourseManagerModel extends BaseOrganizationModel {
  manager: UserModel;
  course: CourseModel;
  creator: UserModel;
}

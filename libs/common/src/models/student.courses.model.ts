import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import UserModel from '@doorward/common/models/user.model';
import CourseModel from '@doorward/common/models/course.model';
import { StudentCourseStatus } from '@doorward/common/types/courses';

export default interface StudentCoursesModel extends BaseOrganizationModel {
  student: UserModel;
  course: CourseModel;
  status: StudentCourseStatus;
}

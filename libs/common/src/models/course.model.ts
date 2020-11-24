import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import { CourseStatus } from '@doorward/common/types/courses';
import UserModel from '@doorward/common/models/user.model';
import MeetingRoomModel from '@doorward/common/models/meeting.room.model';
import ModuleModel from '@doorward/common/models/module.model';
import StudentCoursesModel from '@doorward/common/models/student.courses.model';
import DiscussionGroupModel from '@doorward/common/models/discussion.group.model';

export default interface CourseModel extends BaseOrganizationModel {
  title: string;
  description: string;
  objectives: string;
  requirements: string;
  status: CourseStatus;
  meetingRoom: MeetingRoomModel;
  author: UserModel;
  modules: Array<ModuleModel>;
  studentCourses: Array<StudentCoursesModel>;
  discussionGroups: Array<DiscussionGroupModel>;
  managers: Array<UserModel>;
  students: Array<UserModel>;
  numStudents: number;
  itemsCount: Partial<Record<ModuleItemType, number> & Record<AssessmentTypes, number>>;
}

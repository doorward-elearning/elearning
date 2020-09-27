import AnswerEntity from '@doorward/common/entities/answer.entity';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
import ClassroomEntity from '@doorward/common/entities/classroom.entity';
import CourseEntity from '@doorward/common/entities/course.entity';
import FileEntity from '@doorward/common/entities/file.entity';
import GroupEntity from '@doorward/common/entities/group.entity';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import MeetingEntity from '@doorward/common/entities/meeting.entity';
import MeetingRoomEntity from '@doorward/common/entities/meeting.room.entity';
import MeetingRoomMemberEntity from '@doorward/common/entities/meeting.room.member.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import PasswordsResetsEntity from '@doorward/common/entities/passwords.resets.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';
import RoleEntity from '@doorward/common/entities/role.entity';
import SchoolEntity from '@doorward/common/entities/school.entity';
import StudentCoursesEntity from '@doorward/common/entities/student.courses.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import CourseManagerEntity from '@doorward/common/entities/course.manager.entity';
import PrivilegeEntity from '@doorward/common/entities/privilege.entity';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';
import { PageEntity } from '@doorward/common/entities/page.entity';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';

const entities = [
  AnswerEntity,
  AssignmentSubmissionEntity,
  ClassroomEntity,
  CourseEntity,
  FileEntity,
  GroupEntity,
  CourseManagerEntity,
  GroupMemberEntity,
  MeetingEntity,
  MeetingRoomEntity,
  MeetingRoomMemberEntity,
  ModuleEntity,
  ModuleItemEntity,
  OrganizationEntity,
  PasswordsResetsEntity,
  QuestionEntity,
  RoleEntity,
  SchoolEntity,
  StudentCoursesEntity,
  UserEntity,
  PrivilegeEntity,
  QuizEntity,
  PageEntity,
  AssignmentEntity,
];

export default entities;

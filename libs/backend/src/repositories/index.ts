import AnswerRepository from '@doorward/backend/repositories/answer.repository';
import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';
import AssessmentSubmissionRepository from '@doorward/backend/repositories/assessment.submission.repository';
import AssignmentRepository from '@doorward/backend/repositories/assignment.repository';
import AssignmentSubmissionRepository from '@doorward/backend/repositories/assignment.submission.repository';
import ChatMessageActivityRepository from '@doorward/backend/repositories/chat.message.activity.repository';
import ChatMessageRepository from '@doorward/backend/repositories/chat.message.repository';
import { ClassroomRepository } from '@doorward/backend/repositories/classroom.repository';
import ConversationRepository from '@doorward/backend/repositories/conversation.repository';
import CourseManagerRepository from '@doorward/backend/repositories/course.manager.repository';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';
import DiscussionCommentRepository from '@doorward/backend/repositories/discussion.comment.repository';
import DiscussionGroupRepository from '@doorward/backend/repositories/discussion.group.repository';
import ExamRepository from '@doorward/backend/repositories/exam.repository';
import { FilesRepository } from '@doorward/backend/repositories/files.repository';
import GroupMembersRepository from '@doorward/backend/repositories/group.members.repository';
import GroupsRepository from '@doorward/backend/repositories/groups.repository';
import MeetingRoomMemberRepository from '@doorward/backend/repositories/meeting.room.member.repository';
import MeetingRoomRepository from '@doorward/backend/repositories/meeting.room.repository';
import MeetingsRepository from '@doorward/backend/repositories/meetings.repository';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { ObjectType } from 'typeorm';
import ModuleVideoRepository from '@doorward/backend/repositories/module-video.repository';
import ModulesRepository from '@doorward/backend/repositories/modules.repository';
import PageRepository from '@doorward/backend/repositories/page.repository';
import PasswordResetsRepository from '@doorward/backend/repositories/password.resets.repository';
import PrivilegeRepository from '@doorward/backend/repositories/privilege.repository';
import QuestionRepository from '@doorward/backend/repositories/question.repository';
import QuestionSectionRepository from '@doorward/backend/repositories/question.section.repository';
import QuizRepository from '@doorward/backend/repositories/quiz.repository';
import RolesRepository from '@doorward/backend/repositories/roles.repository';
import { SchoolRepository } from '@doorward/backend/repositories/school.repository';
import StudentCoursesRepository from '@doorward/backend/repositories/student.courses.repository';
import { StudentsRepository } from '@doorward/backend/repositories/students.repository';
import TeacherRepository from '@doorward/backend/repositories/teacher.repository';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { UserSessionRepository } from './user.session.repository';

const repositories = [
  AnswerRepository,
  AssessmentRepository,
  AssessmentSubmissionRepository,
  AssignmentRepository,
  AssignmentSubmissionRepository,
  ChatMessageActivityRepository,
  ChatMessageRepository,
  ClassroomRepository,
  ConversationRepository,
  CourseManagerRepository,
  CoursesRepository,
  DiscussionCommentRepository,
  DiscussionGroupRepository,
  ExamRepository,
  FilesRepository,
  GroupMembersRepository,
  GroupsRepository,
  MeetingRoomMemberRepository,
  MeetingRoomRepository,
  MeetingsRepository,
  ModuleItemsRepository,
  ModuleVideoRepository,
  ModulesRepository,
  PageRepository,
  PasswordResetsRepository,
  PrivilegeRepository,
  QuestionRepository,
  QuestionSectionRepository,
  QuizRepository,
  RolesRepository,
  SchoolRepository,
  StudentCoursesRepository,
  StudentsRepository,
  TeacherRepository,
  UsersRepository,
  UserSessionRepository
];

export default repositories;

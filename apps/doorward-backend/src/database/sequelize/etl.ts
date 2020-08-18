import { QueryRunner } from 'typeorm';
import { SCHEMA } from '../migrations/1497735758507-BackupSequelizeData';
import { UserStatus } from '@doorward/common/types/users';
import {
  AssignmentSubmissionStatus,
  AssignmentSubmissionType,
  CourseStatus,
  StudentCourseStatus,
} from '@doorward/common/types/courses';
import { MeetingRoomTypes, MeetingStatus } from '@doorward/common/types/meeting';
import { GroupRoles } from '@doorward/common/types/groups';

const restoreData = async (
  queryRunner: QueryRunner,
  tableName: string,
  cellTransformer: Record<string, (data: any, row: Record<string, any>) => any> = {}
) => {
  const tableExists = await queryRunner.query(
    `SELECT FROM information_schema.tables WHERE table_schema = '${SCHEMA}' AND table_name = '${tableName}'`
  );
  if (tableExists.length) {
    const rows = await queryRunner.query(`SELECT * FROM ${SCHEMA}."${tableName}"`);

    const columns = await queryRunner.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name='${tableName}' AND table_schema='public'`
    );

    await Promise.all(
      rows.map(async (row) => {
        await Promise.all(
          columns.map(async ({ column_name: field }) => {
            row[field] = cellTransformer[field] ? await cellTransformer[field](row[field], row) : row[field];
          })
        );

        const query = Object.keys(columns)
          .map((x, index) => '$' + (index + 1))
          .join(' , ');

        const fields = columns.map((column) => {
          return row[column.column_name];
        });

        await queryRunner.query(`INSERT INTO public."${tableName}" VALUES (${query})`, fields);
      })
    );
  }
};

const getCourseOrganization = async (queryRunner: QueryRunner, courseId: string) => {
  const row = await queryRunner.query(`SELECT "organizationId" FROM ${SCHEMA}."Courses" WHERE "id" = '${courseId}'`);

  return row && row.length && row[0].organizationId;
};

const getUserOrganization = async (queryRunner: QueryRunner, userId: string) => {
  const row = await queryRunner.query(`SELECT "organizationId" FROM ${SCHEMA}."Users" WHERE "id" = '${userId}'`);

  return row && row.length && row[0].organizationId;
};

export const restoreOrganizations = async (queryRunner: QueryRunner) => {
  await restoreData(queryRunner, 'Organizations');
};

export const restoreUsers = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Users', {
    status: () => UserStatus.ACTIVE,
    firstName: (data) => data || 'Admin',
    lastName: (data) => data || 'User',
  });
};

export const restoreRoles = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Roles');
};

export const restoreUserRoles = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'UserRoles', {
    organizationId: async (value, row) => {
      return getUserOrganization(queryRunner, row.userId);
    },
  });
};

export const restoreCourses = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Courses', {
    status: () => CourseStatus.PUBLISHED,
  });
};

export const restoreModules = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Modules', {
    organizationId: async (value, row) => getCourseOrganization(queryRunner, row.courseId),
  });
};

export const restoreStudentCourses = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'StudentCourses', {
    status: () => StudentCourseStatus.ONGOING,
    organizationId: async (value, row) => getCourseOrganization(queryRunner, row.courseId),
  });
};

export const restoreModuleItems = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'ModuleItems', {
    content: (data) => JSON.stringify(data),
    organizationId: async (value, row) => getUserOrganization(queryRunner, row.createdBy),
  });
};

export const restoreMeetingRooms = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'MeetingRooms', {
    type: () => MeetingRoomTypes.PRIVATE,
  });
};

export const restorePasswordResets = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'PasswordResets', {
    organizationId: async (row, data) => getUserOrganization(queryRunner, data.userId),
  });
};

export const restoreQuestions = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Questions', {
    organizationId: async (data, row) => {
      const moduleItem = await queryRunner.query(
        `SELECT "createdBy" FROM ${SCHEMA}."ModuleItems" WHERE "id" = '${row.quizId}'`
      );
      return getUserOrganization(queryRunner, moduleItem[0].createdBy);
    },
  });
};

export const restoreAnswers = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Answers', {
    organizationId: async (data, row) => {
      const question = await queryRunner.query(
        `SELECT "quizId" FROM ${SCHEMA}."Questions" WHERE "id" = '${row.questionId}'`
      );
      const moduleItem = await queryRunner.query(
        `SELECT "createdBy" FROM ${SCHEMA}."ModuleItems" WHERE "id" = '${question[0].quizId}'`
      );
      return getUserOrganization(queryRunner, moduleItem[0].createdBy);
    },
    description: (data) => data || '',
    answer: (data) => data,
  });
};

export const restoreMeetingRoomMembers = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'MeetingRoomMembers', {
    organizationId: async (data, row) => getUserOrganization(queryRunner, row.participantId),
  });
};

export const restoreMeetings = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Meetings', {
    organizationId: async (data, row) => getUserOrganization(queryRunner, row.hostId),
    status: (data) =>
      ({
        STARTED: MeetingStatus.STARTED,
        ENDED: MeetingStatus.ENDED,
      }[data]),
  });
};

export const restoreGroups = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Groups', {
    organizationId: async (data, row) => getUserOrganization(queryRunner, row.createdBy),
  });
};

export const restoreGroupMembers = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'GroupMembers', {
    organizationId: async (data, row) => getUserOrganization(queryRunner, row.userId),
    role: (data) =>
      ({
        PARTICIPANT: GroupRoles.MEMBER,
        ADMINISTRATOR: GroupRoles.ADMINISTRATOR,
      }[data]),
  });
};

export const restoreFiles = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Files', {
    public: (data, row) => data || !row.ownerId,
    publicUrl: (data) => data || '',
  });
};

export const restoreAssignmentSubmissions = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'AssignmentSubmissions', {
    organizationId: async (data, row) => getUserOrganization(queryRunner, row.studentId),
    graderId: (data, row) => row.reviewerId,
    type: (data, row) => row.submissionType as AssignmentSubmissionType,
    status: () => AssignmentSubmissionStatus.SUBMITTED,
    points: () => 0,
    numResubmissions: () => 0,
    grade: () => 0,
  });
};

export default async (queryRunner: QueryRunner) => {
  await restoreOrganizations(queryRunner);
  await restoreUsers(queryRunner);
  await restoreRoles(queryRunner);
  await restoreUserRoles(queryRunner);
  await restoreMeetingRooms(queryRunner);
  await restoreCourses(queryRunner);
  await restoreModules(queryRunner);
  await restoreStudentCourses(queryRunner);
  await restoreModuleItems(queryRunner);
  await restorePasswordResets(queryRunner);
  await restoreQuestions(queryRunner);
  await restoreAnswers(queryRunner);
  await restoreMeetingRoomMembers(queryRunner);
  await restoreMeetings(queryRunner);
  await restoreGroups(queryRunner);
  await restoreGroupMembers(queryRunner);
  await restoreFiles(queryRunner);
  await restoreAssignmentSubmissions(queryRunner);
};
const TABLES = [
  'Organizations',
  'Users',
  'Roles',
  'UserRoles',
  'Courses',
  'Modules',
  'StudentCourses',
  'ModuleItems',
  'PasswordResets',
  'Questions',
  'Answers',
  'MeetingRooms',
  'MeetingRoomMembers',
  'Meetings',
  'Groups',
  'GroupMembers',
  'Files',
  'AssignmentSubmissions',
  'Schools',
  'Classrooms',
  'CourseManagers',
];

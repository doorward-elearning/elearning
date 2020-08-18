import { ObjectType, QueryRunner } from 'typeorm';
import { SCHEMA } from '../migrations/1497735758507-BackupSequelizeData';
import { OrganizationEntity } from '../entities/organization.entity';
import UserEntity from '../entities/user.entity';
import { UserStatus } from '@doorward/common/types/users';

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

const restoreData = async (
  queryRunner: QueryRunner,
  tableName: string,
  entity: ObjectType<any>,
  cellTransformer: Record<string, (data: any) => any> = {}
) => {
  const tableExists = await queryRunner.query(
    `SELECT FROM information_schema.tables WHERE table_schema = '${SCHEMA}' AND table_name = '${tableName}'`
  );
  if (tableExists) {
    const rows = await queryRunner.query(`SELECT * FROM ${SCHEMA}."${tableName}"`);

    await Promise.all(
      rows.map(async (row) => {
        Object.keys(row).map((field) => {
          row[field] = cellTransformer[field] ? cellTransformer[field](row[field]) : row[field];
        });

        const query = Object.keys(row)
          .map((x) => '$' + x)
          .join(' , ');
        console.log(row, query);

        await queryRunner.manager.insert(entity, row);
      })
    );
  }
};

export const restoreOrganizations = async (queryRunner: QueryRunner) => {
  await restoreData(queryRunner, 'Organizations', OrganizationEntity);
};

export const restoreUsers = async (queryRunner: QueryRunner) => {
  return restoreData(queryRunner, 'Users', UserEntity, {
    status: () => UserStatus.ACTIVE,
    firstName: (data) => data || 'Admin',
    lastName: (data) => data || 'User',
  });
};

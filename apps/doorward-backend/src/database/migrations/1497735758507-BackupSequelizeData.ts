import { MigrationInterface, QueryRunner } from 'typeorm';

export const SCHEMA = 'sequelize_data_backup';
export const TABLES = [
  'Organizations',
  'MeetingRooms',
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

export const ENUMS = [
  'enum_Courses_status',
  'enum_GroupMembers_role',
  'enum_MeetingRoomMembers_role',
  'enum_Users_gender',
  'enum_Users_status',
];
export class BackupSequelizeData1497735758507 implements MigrationInterface {
  name = 'BackupSequelizeData1497735758507';

  public async dropSchema(queryRunner: QueryRunner) {
    await queryRunner.createSchema(SCHEMA, true);
    await Promise.all(
      TABLES.reverse().map(async (table) => {
        await queryRunner.query(`DROP TABLE IF EXISTS ${SCHEMA}."${table}"`);
      })
    );

    await queryRunner.dropSchema(SCHEMA);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.dropSchema(queryRunner);
    await queryRunner.createSchema(SCHEMA, true);

    await Promise.all(
      TABLES.map(async (table) => {
        const tableExists = await queryRunner.query(
          `SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${table}'`
        );
        const backupTableExists = await queryRunner.query(
          `SELECT FROM information_schema.tables WHERE table_schema = '${SCHEMA}' AND table_name = '${table}'`
        );
        if (tableExists.length && !backupTableExists.length) {
          await queryRunner.query(`CREATE TABLE ${SCHEMA}."${table}" AS TABLE public."${table}"`);
        }
      })
    );
    await Promise.all(
      TABLES.reverse().map(async (table) => {
        await queryRunner.query(`DROP TABLE IF EXISTS public."${table}" CASCADE`);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      TABLES.map(async (table) => {
        const tableExists = await queryRunner.query(
          `SELECT FROM information_schema.tables WHERE table_schema = '${SCHEMA}' AND table_name = '${table}'`
        );
        if (tableExists.length) {
          await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS public."${table}" (LIKE ${SCHEMA}."${table}" INCLUDING ALL)`
          );
          await queryRunner.query(`INSERT INTO public."${table}" SELECT * FROM ${SCHEMA}."${table}"`);
        }
      })
    );

    await this.dropSchema(queryRunner);
  }
}

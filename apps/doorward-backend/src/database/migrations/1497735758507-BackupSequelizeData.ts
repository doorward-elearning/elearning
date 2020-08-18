import { MigrationInterface, QueryRunner } from 'typeorm';

export const SCHEMA = 'sequelize_data_backup';
export const TABLES = [
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
export class BackupSequelizeData1497735758507 implements MigrationInterface {
  name = 'BackupSequelizeData1497735758507';

  public async dropSchema(queryRunner: QueryRunner) {
    await Promise.all(
      TABLES.reverse().map(async (table) => {
        await queryRunner.query(`DROP TABLE IF EXISTS public."${table}" CASCADE`);
      })
    );
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."enum_Courses_status" CASCADE`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."enum_GroupMembers_role" CASCADE`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."enum_MeetingRoomMembers_role" CASCADE`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."enum_Users_gender" CASCADE`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."enum_Users_status" CASCADE;`);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
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
          await queryRunner.query(`CREATE TABLE ${SCHEMA}."${table}" (LIKE public."${table}" INCLUDING ALL)`);
          await queryRunner.query(`INSERT INTO ${SCHEMA}."${table}" SELECT * FROM public."${table}"`);
        }
      })
    );
    await this.dropSchema(queryRunner);
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
    await Promise.all(
      TABLES.reverse().map(async (table) => {
        await queryRunner.query(`DROP TABLE IF EXISTS ${SCHEMA}."${table}"`);
      })
    );
    await queryRunner.dropSchema(SCHEMA);
  }
}

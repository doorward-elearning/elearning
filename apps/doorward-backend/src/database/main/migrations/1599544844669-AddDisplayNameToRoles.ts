import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDisplayNameToRoles1599544844669 implements MigrationInterface {
  name = 'AddDisplayNameToRoles1599544844669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Roles" ADD "displayName" character varying`);
    await queryRunner.query(`UPDATE "Roles" SET "displayName" = "name"`);
    await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "displayName" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "name"`);
    await queryRunner.query(`CREATE TYPE "Roles_name_enum" AS ENUM('SUPER_ADMINISTRATOR', 'TEACHER', 'STUDENT')`);
    await queryRunner.query(`ALTER TABLE "Roles" ADD "name" "Roles_name_enum"`);
    await queryRunner.query(
      `UPDATE "Roles" SET "name" = 'SUPER_ADMINISTRATOR' WHERE "displayName" = 'Super Administrator'`
    );
    await queryRunner.query(`UPDATE "Roles" SET "name" = 'TEACHER' WHERE "displayName" = 'Teacher'`);
    await queryRunner.query(`UPDATE "Roles" SET "name" = 'STUDENT' WHERE "displayName" = 'Student'`);
    await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "name" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "name"`);
    await queryRunner.query(`DROP TYPE "Roles_name_enum"`);
    await queryRunner.query(`ALTER TABLE "Roles" ADD "name" character varying`);
    await queryRunner.query(`UPDATE "Roles" SET "name" = "displayName"`);
    await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "displayName"`);
  }
}

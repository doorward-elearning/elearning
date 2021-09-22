import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNullableFields1597750082408 implements MigrationInterface {
  name = 'UpdateNullableFields1597750082408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Organizations" ALTER COLUMN "description" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Organizations" ALTER COLUMN "darkThemeIcon" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Organizations" ALTER COLUMN "icon" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Meetings" ALTER COLUMN "numParticipants" SET DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "Meetings" ALTER COLUMN "status" SET DEFAULT 'Pending'`);
    await queryRunner.query(`ALTER TABLE "MeetingRooms" ALTER COLUMN "type" SET DEFAULT 'Private'`);
    await queryRunner.query(`ALTER TABLE "Groups" ALTER COLUMN "type" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "password" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "zipCode" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "country" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "city" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "gender" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "description" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "objectives" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "requirements" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "status" SET DEFAULT 'Draft'`);
    await queryRunner.query(`ALTER TABLE "Modules" ALTER COLUMN "description" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Files" ALTER COLUMN "public" SET DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Files" ALTER COLUMN "public" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "Modules" ALTER COLUMN "description" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "requirements" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "objectives" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "description" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "gender" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "city" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "country" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "zipCode" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "password" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Groups" ALTER COLUMN "type" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "MeetingRooms" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "Meetings" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "Meetings" ALTER COLUMN "numParticipants" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "Organizations" ALTER COLUMN "icon" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Organizations" ALTER COLUMN "darkThemeIcon" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Organizations" ALTER COLUMN "description" SET NOT NULL`);
  }
}

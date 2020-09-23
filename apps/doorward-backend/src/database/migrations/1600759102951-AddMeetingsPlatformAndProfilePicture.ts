import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMeetingsPlatformAndProfilePicture1600759102951 implements MigrationInterface {
  name = 'AddMeetingsPlatformAndProfilePicture1600759102951';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "Organizations_meetingplatform_enum" AS ENUM('Openvidu', 'Jitsi')`);
    await queryRunner.query(
      `ALTER TABLE "Organizations" ADD "meetingPlatform" "Organizations_meetingplatform_enum" NOT NULL DEFAULT 'Openvidu'`
    );
    await queryRunner.query(
      `CREATE TYPE "Organizations_customertype_enum" AS ENUM('school-india', 'school-international', 'college-india', 'college-international', 'institute-india', 'institute-international', 'corporate-india', 'corporate-international')`
    );
    await queryRunner.query(
      `ALTER TABLE "Organizations" ADD "customerType" "Organizations_customertype_enum" NOT NULL DEFAULT 'college-india'`
    );
    await queryRunner.query(`ALTER TABLE "Users" ADD "profilePicture" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "profilePicture"`);
    await queryRunner.query(`ALTER TABLE "Organizations" DROP COLUMN "customerType"`);
    await queryRunner.query(`DROP TYPE "Organizations_customertype_enum"`);
    await queryRunner.query(`ALTER TABLE "Organizations" DROP COLUMN "meetingPlatform"`);
    await queryRunner.query(`DROP TYPE "Organizations_meetingplatform_enum"`);
  }
}

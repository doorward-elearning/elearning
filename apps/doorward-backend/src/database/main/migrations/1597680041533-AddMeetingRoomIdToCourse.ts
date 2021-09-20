import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMeetingRoomIdToCourse1597680041533 implements MigrationInterface {
  name = 'AddMeetingRoomIdToCourse1597680041533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Courses" ADD "meetingRoomId" character varying`);
    await queryRunner.query(
      `ALTER TABLE "Courses" ADD CONSTRAINT "UQ_1dc9f655a2e97c55f58970e2081" UNIQUE ("meetingRoomId")`
    );
    await queryRunner.query(
      `ALTER TABLE "Courses" ADD CONSTRAINT "FK_1dc9f655a2e97c55f58970e2081" FOREIGN KEY ("meetingRoomId") REFERENCES "MeetingRooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Courses" DROP CONSTRAINT IF EXISTS "FK_1dc9f655a2e97c55f58970e2081"`);
    await queryRunner.query(`ALTER TABLE "Courses" DROP CONSTRAINT IF EXISTS "UQ_1dc9f655a2e97c55f58970e2081"`);
    await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "meetingRoomId"`);
  }
}

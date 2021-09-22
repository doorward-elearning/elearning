import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMeetingRoomMembers1597679405759 implements MigrationInterface {
  name = 'CreateMeetingRoomMembers1597679405759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "MeetingRoomMembers_role_enum" AS ENUM('PUBLISHER', 'SUBSCRIBER', 'MODERATOR')`
    );
    await queryRunner.query(
      `CREATE TABLE "MeetingRoomMembers" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" "MeetingRoomMembers_role_enum" NOT NULL DEFAULT 'PUBLISHER', "meetingRoomId" character varying, "participantId" character varying, CONSTRAINT "PK_7067e6f90b6d42544d0ff6236a9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "MeetingRoomMembers" ADD CONSTRAINT "FK_1839218acbcd968a9ab7e6c7d89" FOREIGN KEY ("meetingRoomId") REFERENCES "MeetingRooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "MeetingRoomMembers" ADD CONSTRAINT "FK_51aca71fb163fe9ffe49b9a136c" FOREIGN KEY ("participantId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "MeetingRoomMembers" DROP CONSTRAINT IF EXISTS "FK_51aca71fb163fe9ffe49b9a136c"`
    );
    await queryRunner.query(
      `ALTER TABLE "MeetingRoomMembers" DROP CONSTRAINT IF EXISTS "FK_1839218acbcd968a9ab7e6c7d89"`
    );
    await queryRunner.query(`DROP TABLE "MeetingRoomMembers"`);
    await queryRunner.query(`DROP TYPE "MeetingRoomMembers_role_enum"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMeeting1597679856981 implements MigrationInterface {
  name = 'CreateMeeting1597679856981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "Meetings_status_enum" AS ENUM('Pending', 'Started', 'Ended')`);
    await queryRunner.query(
      `CREATE TABLE "Meetings" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "sessionId" character varying NOT NULL, "numParticipants" integer NOT NULL, "status" "Meetings_status_enum" NOT NULL, "hostId" character varying, "meetingRoomId" character varying, CONSTRAINT "PK_b6bef0e8c793f404cfb5af9493d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Meetings" ADD CONSTRAINT "FK_cc26011bc140a3bdce57c9c8f83" FOREIGN KEY ("hostId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Meetings" ADD CONSTRAINT "FK_16ec390bf7147a0816cca34a608" FOREIGN KEY ("meetingRoomId") REFERENCES "MeetingRooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Meetings" DROP CONSTRAINT IF EXISTS "FK_16ec390bf7147a0816cca34a608"`);
    await queryRunner.query(`ALTER TABLE "Meetings" DROP CONSTRAINT IF EXISTS "FK_cc26011bc140a3bdce57c9c8f83"`);
    await queryRunner.query(`DROP TABLE "Meetings"`);
    await queryRunner.query(`DROP TYPE "Meetings_status_enum"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMeetingRooms1597677913484 implements MigrationInterface {
  name = 'CreateMeetingRooms1597677913484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "MeetingRooms" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_7b9840e8555e1dcc519868dcce1" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "MeetingRooms"`);
  }
}

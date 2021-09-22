import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateMeetingRooms1597677973718 implements MigrationInterface {
  name = 'UpdateMeetingRooms1597677973718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "MeetingRooms"`);
    await queryRunner.query(
      `CREATE TABLE "MeetingRooms" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, CONSTRAINT "PK_7b9840e8555e1dcc519868dcce1" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "MeetingRooms" RENAME COLUMN "title" TO "name"`);
  }
}

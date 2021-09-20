import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClassroom1597730988455 implements MigrationInterface {
  name = 'CreateClassroom1597730988455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Classrooms" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "schoolId" character varying, "meetingRoomId" character varying, CONSTRAINT "REL_74bbd2ca90c85da79d874a006b" UNIQUE ("meetingRoomId"), CONSTRAINT "PK_8dfd7d4d2520ccf66c53c617eed" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Classrooms" ADD CONSTRAINT "FK_bcaa9f2625a38abeb9d9d3155f9" FOREIGN KEY ("schoolId") REFERENCES "Schools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Classrooms" ADD CONSTRAINT "FK_74bbd2ca90c85da79d874a006b9" FOREIGN KEY ("meetingRoomId") REFERENCES "MeetingRooms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Classrooms" DROP CONSTRAINT IF EXISTS "FK_74bbd2ca90c85da79d874a006b9"`);
    await queryRunner.query(`ALTER TABLE "Classrooms" DROP CONSTRAINT IF EXISTS "FK_bcaa9f2625a38abeb9d9d3155f9"`);
    await queryRunner.query(`DROP TABLE "Classrooms"`);
  }
}

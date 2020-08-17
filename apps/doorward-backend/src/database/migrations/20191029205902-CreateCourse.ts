import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourse20191029205902 implements MigrationInterface {
  name = 'CreateCourse20191029205902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Courses" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text NOT NULL, "objectives" text NOT NULL, "requirements" text NOT NULL, "status" text NOT NULL, "createdBy" character varying, CONSTRAINT "PK_e01ce00d3984a78d0693ab3ecbe" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Courses" ADD CONSTRAINT "FK_4cf8a4a714dd25acb7d35904401" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Courses" DROP CONSTRAINT IF EXISTS "FK_4cf8a4a714dd25acb7d35904401"`);
    await queryRunner.query(`DROP TABLE "Courses"`);
  }
}

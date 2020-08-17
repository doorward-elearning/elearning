import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModule20191029210935 implements MigrationInterface {
  name = 'CreateModule20191029210935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Modules" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "description" text NOT NULL, "title" character varying NOT NULL, "courseId" character varying, CONSTRAINT "PK_1623db184d7b8c115deb0692023" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Modules" ADD CONSTRAINT "FK_819272f527248e89cc9e4e22d3f" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Modules" DROP CONSTRAINT IF EXISTS "FK_819272f527248e89cc9e4e22d3f"`);
    await queryRunner.query(`DROP TABLE "Modules"`);
  }
}

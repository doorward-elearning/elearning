import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQuestion1597646757621 implements MigrationInterface {
  name = 'CreateQuestion1597646757621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Questions" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "question" text NOT NULL, "points" integer NOT NULL DEFAULT 0, "quizId" character varying, CONSTRAINT "PK_8f81bcc6305787ab7dd0d828e21" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Questions" ADD CONSTRAINT "FK_102f5ff17d80a5e4bec76cc9833" FOREIGN KEY ("quizId") REFERENCES "ModuleItems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT IF EXISTS "FK_102f5ff17d80a5e4bec76cc9833"`);
    await queryRunner.query(`DROP TABLE "Questions"`);
  }
}

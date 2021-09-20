import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAnswer1597646757622 implements MigrationInterface {
  name = 'CreateAnswer1597646757622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Answers" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "answer" text NOT NULL, "description" text NOT NULL, "correct" boolean NOT NULL DEFAULT false, "questionId" character varying, CONSTRAINT "PK_e9ce77a9a6326d042fc833d63f5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Answers" ADD CONSTRAINT "FK_ff66967b8c32d6a22e32e5c4f66" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Answers" DROP CONSTRAINT IF EXISTS "FK_ff66967b8c32d6a22e32e5c4f66"`);
    await queryRunner.query(`DROP TABLE "Answers"`);
  }
}

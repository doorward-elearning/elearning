import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAssessmentEntity1602935784609 implements MigrationInterface {
  name = 'AddAssessmentEntity1602935784609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT "FK_102f5ff17d80a5e4bec76cc9833"`);
    const existingQuizzes = await queryRunner.query(`SELECT id, "quizId" FROM "Questions";`);

    await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "quizId"`);
    await queryRunner.query(`CREATE TYPE "ModuleItems_assessmenttype_enum" AS ENUM('Exam', 'Quiz')`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "assessmentType" "ModuleItems_assessmenttype_enum"`);
    await queryRunner.query(`CREATE TYPE "Questions_type_enum" AS ENUM('Multiple Choice', 'Text input')`);
    await queryRunner.query(
      `ALTER TABLE "Questions" ADD "type" "Questions_type_enum" NOT NULL DEFAULT 'Multiple Choice'`
    );
    await queryRunner.query(`ALTER TABLE "Questions" ADD "assessmentId" character varying`);

    await Promise.all(
      existingQuizzes.map(async (quiz) => {
        await queryRunner.query(`UPDATE "Questions" SET "assessmentId" = $1 WHERE "id" = $2`, [quiz.quizId, quiz.id]);
      })
    );
    await queryRunner.query(`ALTER TYPE "public"."ModuleItems_type_enum" RENAME TO "ModuleItems_type_enum_old"`);

    await queryRunner.query(`ALTER TABLE "ModuleItems" ALTER COLUMN "type" SET DATA TYPE text`);
    await queryRunner.query(`UPDATE "ModuleItems" SET "type" = 'Assessment' WHERE type = 'Quiz'; `);

    await queryRunner.query(`CREATE TYPE "ModuleItems_type_enum" AS ENUM('Page', 'Assignment', 'Assessment', 'File')`);
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ALTER COLUMN "type" TYPE "ModuleItems_type_enum" USING "type"::"text"::"ModuleItems_type_enum"`
    );
    await queryRunner.query(`DROP TYPE "ModuleItems_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "Questions" ADD CONSTRAINT "FK_6eff2df9baa2c53942e5dad4305" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`UPDATE "ModuleItems" SET "assessmentType" = 'Quiz' WHERE type = 'Assessment';`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT "FK_6eff2df9baa2c53942e5dad4305"`);
    await queryRunner.query(`CREATE TYPE "ModuleItems_type_enum_old" AS ENUM('Page', 'Assignment', 'Quiz', 'File')`);

    await queryRunner.query(`ALTER TABLE "ModuleItems" ALTER COLUMN "type" SET DATA TYPE text`);
    await queryRunner.query(`UPDATE "ModuleItems" SET "type" = 'Quiz' WHERE type = 'Assessment'; `);
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ALTER COLUMN "type" TYPE "ModuleItems_type_enum_old" USING "type"::"text"::"ModuleItems_type_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "ModuleItems_type_enum"`);
    await queryRunner.query(`ALTER TYPE "ModuleItems_type_enum_old" RENAME TO  "ModuleItems_type_enum"`);

    const existingQuizzes = await queryRunner.query(`SELECT id, "assessmentId" FROM "Questions";`);

    await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "assessmentId"`);
    await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "Questions_type_enum"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "assessmentType"`);
    await queryRunner.query(`DROP TYPE "ModuleItems_assessmenttype_enum"`);
    await queryRunner.query(`ALTER TABLE "Questions" ADD "quizId" character varying`);

    await Promise.all(
      existingQuizzes.map(async (quiz) => {
        await queryRunner.query(`UPDATE "Questions" SET "quizId" = $1 WHERE "id" = $2`, [quiz.assessmentId, quiz.id]);
      })
    );
    await queryRunner.query(
      `ALTER TABLE "Questions" ADD CONSTRAINT "FK_102f5ff17d80a5e4bec76cc9833" FOREIGN KEY ("quizId") REFERENCES "ModuleItems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}

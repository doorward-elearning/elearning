import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveAssessmentFromQuestion1619007511387 implements MigrationInterface {
  name = 'RemoveAssessmentFromQuestion1619007511387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT "FK_6eff2df9baa2c53942e5dad4305"`);
    await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "assessmentId"`);
    await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "sectionId" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "sectionId" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Questions" ADD "assessmentId" character varying`);
    await queryRunner.query(
      `ALTER TABLE "Questions" ADD CONSTRAINT "FK_6eff2df9baa2c53942e5dad4305" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );

    const questions = await queryRunner.query(
      `SELECT "Questions".id as "id", QS."assessmentId" as "assessmentId" FROM "Questions" INNER JOIN "QuestionSections" QS on QS.id = "Questions"."sectionId"`
    );

    await Promise.all(
      questions.map(async (question) => {
        await queryRunner.query(`UPDATE "Questions" SET "assessmentId" = $1 WHERE id = $2`, [
          question.assessmentId,
          question.id,
        ]);
      })
    );
  }
}

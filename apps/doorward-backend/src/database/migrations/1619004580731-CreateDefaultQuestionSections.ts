import { MigrationInterface, QueryRunner } from 'typeorm';
import Tools from '@doorward/common/utils/Tools';

export class CreateDefaultQuestionSections1619004580731 implements MigrationInterface {
  private static async getSection(queryRunner: QueryRunner, assessmentId: string): Promise<any> {
    const sections = await queryRunner.query(`SELECT * FROM "QuestionSections" WHERE "assessmentId" = $1`, [
      assessmentId,
    ]);
    return sections.length ? sections[0] : null;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const questions = await queryRunner.query(
      `SELECT "Questions".id as "questionId","assessmentId",points,instructions,"Questions"."organizationId" as "organizationId" FROM "Questions" INNER JOIN "ModuleItems" ON "Questions"."assessmentId" = "ModuleItems".id`
    );

    const assessments = await queryRunner.query(`SELECT *FROM "ModuleItems" WHERE type = 'Assessment'`);
    await Promise.all(
      assessments.map(async (assessment) => {
        await queryRunner.query(
          `INSERT INTO "QuestionSections" (id, points, config, "organizationId", "assessmentId")
         VALUES ($1, 0, $2, $3, $4)`,
          [Tools.generateId(), JSON.stringify({}), assessment.organizationId, assessment.id]
        );
      })
    );

    await Promise.all(
      questions.map(async (question) => {
        const section = await CreateDefaultQuestionSections1619004580731.getSection(queryRunner, question.assessmentId);

        // run the update query
        await queryRunner.query(
          `UPDATE "QuestionSections" SET points = points + coalesce($1, 0), instructions = $2 WHERE id = $3`,
          [question.points, question.instructions, section.id]
        );

        await queryRunner.query(`UPDATE "Questions" SET "sectionId" = $1 WHERE id = $2`, [
          section.id,
          question.questionId,
        ]);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "Questions" SET "sectionId" = NULL`);
    await queryRunner.query(`DELETE FROM "QuestionSections"`);
  }
}

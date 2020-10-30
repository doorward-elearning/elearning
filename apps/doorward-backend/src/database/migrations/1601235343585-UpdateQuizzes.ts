import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateQuizzes1601235343585 implements MigrationInterface {
  name = 'UpdateQuizzes1601235343585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "options" json`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "instructions" text`);

    const quizzes = await queryRunner.query('SELECT * FROM "ModuleItems" WHERE type = $1', ['Quiz']);

    await Promise.all(
      quizzes.map(async (quiz) => {
        try {
          const content = JSON.parse(quiz.content);

          await queryRunner.query(`UPDATE "ModuleItems" SET options = $1, instructions = $2 WHERE id = $3`, [
            content.options,
            content.instructions,
            quiz.id,
          ]);
        } catch (e) {
          console.error(e);
        }
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const quizzes = await queryRunner.query('SELECT * FROM "ModuleItems" WHERE type = $1', ['Quiz']);

    await Promise.all(
      quizzes.map(async (quiz) => {
        await queryRunner.query(`UPDATE "ModuleItems" SET content = $1 WHERE id = $2`, [
          JSON.stringify({
            options: quiz.options,
            instructions: quiz.instructions,
          }),
          quiz.id,
        ]);
      })
    );

    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "options"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "instructions"`);
  }
}

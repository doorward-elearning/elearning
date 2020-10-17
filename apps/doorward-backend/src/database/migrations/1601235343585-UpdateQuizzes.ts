import { MigrationInterface, QueryRunner } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';

export class UpdateQuizzes1601235343585 implements MigrationInterface {
  name = 'UpdateQuizzes1601235343585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "options" json`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "instructions" text`);

    const repository = queryRunner.manager.getRepository(QuizEntity);
    const quizzes = await repository.createQueryBuilder('quiz').where('type = :type', { type: 'Quiz' }).getMany();

    await Promise.all(
      quizzes.map(async (quiz) => {
        try {
          const content = JSON.parse(quiz.content);
          await repository.update(quiz.id, {
            options: content.options,
            instructions: content.instructions,
          });
        } catch (e) {
          console.error(e);
        }
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.manager.getRepository(QuizEntity);
    const quizzes = await repository.createQueryBuilder('quiz').where('type = :type', { type: 'Quiz' }).getMany();

    await Promise.all(
      quizzes.map(async (quiz) => {
        await repository.update(quiz.id, {
          content: JSON.stringify({
            options: quiz.options,
            instructions: quiz.instructions,
          }),
        });
      })
    );

    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "options"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "instructions"`);
  }
}

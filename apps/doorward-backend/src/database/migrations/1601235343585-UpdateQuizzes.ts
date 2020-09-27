import { MigrationInterface, QueryRunner } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';

export class UpdateQuizzes1601235343585 implements MigrationInterface {
  name = 'UpdateQuizzes1601235343585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "options" json`);

    const repository = queryRunner.manager.getRepository(QuizEntity);
    const quizzes = await repository
      .createQueryBuilder('quiz')
      .where('type = :type', { type: ModuleItemType.QUIZ })
      .getMany();

    await Promise.all(
      quizzes.map(async (quiz) => {
        await repository.update(quiz.id, {
          options: JSON.parse(quiz.content).options,
        });
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.manager.getRepository(QuizEntity);
    const quizzes = await repository
      .createQueryBuilder('quiz')
      .where('type = :type', { type: ModuleItemType.QUIZ })
      .getMany();

    await Promise.all(
      quizzes.map(async (quiz) => {
        await repository.update(quiz.id, {
          content: JSON.stringify({
            options: quiz.options,
          }),
        });
      })
    );

    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "options"`);
  }
}

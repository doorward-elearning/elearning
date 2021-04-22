import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateQuestionSectionToUseJSON1619075832493 implements MigrationInterface {
  name = 'UpdateQuestionSectionToUseJSON1619075832493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "QuestionSections" DROP COLUMN "config"`);
    await queryRunner.query(`ALTER TABLE "QuestionSections" ADD "config" json NOT NULL DEFAULT '{}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "QuestionSections" DROP COLUMN "config"`);
    await queryRunner.query(`ALTER TABLE "QuestionSections" ADD "config" text NOT NULL`);
  }
}

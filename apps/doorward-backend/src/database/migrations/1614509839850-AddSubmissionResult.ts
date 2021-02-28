import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubmissionResult1614509839850 implements MigrationInterface {
  name = 'AddSubmissionResult1614509839850';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Answers" ADD "points" integer NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" ADD "submissionResults" text`);
    await queryRunner.query(`ALTER TYPE "public"."Questions_type_enum" RENAME TO "Questions_type_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "Questions_type_enum" AS ENUM('Multiple Choice', 'Text input', 'Multiple choice descriptive')`
    );
    await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "Questions" ALTER COLUMN "type" TYPE "Questions_type_enum" USING "type"::"text"::"Questions_type_enum"`
    );
    await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "type" SET DEFAULT 'Multiple Choice'`);
    await queryRunner.query(`DROP TYPE "Questions_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "Questions_type_enum_old" AS ENUM('Multiple Choice', 'Text input')`);
    await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(`DELETE FROM "Questions" WHERE type='Multiple choice descriptive'`);
    await queryRunner.query(
      `ALTER TABLE "Questions" ALTER COLUMN "type" TYPE "Questions_type_enum_old" USING "type"::"text"::"Questions_type_enum_old"`
    );
    await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "type" SET DEFAULT 'Multiple Choice'`);
    await queryRunner.query(`DROP TYPE "Questions_type_enum"`);
    await queryRunner.query(`ALTER TYPE "Questions_type_enum_old" RENAME TO  "Questions_type_enum"`);
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP COLUMN "submissionResults"`);
    await queryRunner.query(`ALTER TABLE "Answers" DROP COLUMN "points"`);
  }
}

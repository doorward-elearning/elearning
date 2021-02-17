import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateAssignmentSubmission1613582889250 implements MigrationInterface {
  name = 'updateAssignmentSubmission1613582889250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6"`);
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "REL_7bf45a696fee8696ddaaa5c98a"`);
    await queryRunner.query(
      `ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "AssessmentSubmission" DROP CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6"`);
    await queryRunner.query(
      `ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "REL_7bf45a696fee8696ddaaa5c98a" UNIQUE ("assessmentId")`
    );
    await queryRunner.query(
      `ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_7bf45a696fee8696ddaaa5c98a6" FOREIGN KEY ("assessmentId") REFERENCES "ModuleItems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}

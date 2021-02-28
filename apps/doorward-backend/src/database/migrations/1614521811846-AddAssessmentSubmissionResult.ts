import { MigrationInterface, QueryRunner } from 'typeorm';
import assessmentGrader from '../../utils/assessment.grader';

export class AddAssessmentSubmissionResult1614521811846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const submissions = await queryRunner.query(`SELECT id FROM "AssessmentSubmission";`);

    await Promise.all(
      submissions.map(async (submission) => {
        await assessmentGrader(submission.id, queryRunner.connection);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "AssessmentSubmission" SET "submissionResults" = '', grade = 0, "gradedOn"=NULL`);
  }
}

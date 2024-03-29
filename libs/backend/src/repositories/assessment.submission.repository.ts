import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { In, ObjectType } from 'typeorm';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';

export default class AssessmentSubmissionRepository extends MultiOrganizationRepository<AssessmentSubmissionEntity> {
  getEntity(): ObjectType<AssessmentSubmissionEntity> {
    return AssessmentSubmissionEntity;
  }

  /**
   * Get assessment submissions for an assessment.
   *
   * @param assessmentId
   * @param includeDrafts
   */
  public async getStudentSubmissions(
    assessmentId: string,
    includeDrafts = false
  ): Promise<AssessmentSubmissionEntity[]> {
    const status = [AssessmentSubmissionStatus.GRADED, AssessmentSubmissionStatus.SUBMITTED];
    if (includeDrafts) {
      status.push(AssessmentSubmissionStatus.DRAFT);
    }

    return this.find({
      where: {
        assessment: { id: assessmentId },
        status: In(status),
      },
      relations: ['student', 'grader'],
    });
  }

  /**
   *
   * Get a single student's assessment submission
   * @param submissionId
   */
  public async getStudentSubmission(submissionId: string): Promise<AssessmentSubmissionEntity> {
    return this.findOne({
      where: {
        id: submissionId,
      },
      relations: ['student', 'grader'],
    });
  }
}

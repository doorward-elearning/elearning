import OrganizationBasedRepository from '@doorward/backend/repositories/organization.based.repository';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import { EntityRepository, In } from 'typeorm';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';

@EntityRepository(AssessmentSubmissionEntity)
export default class AssessmentSubmissionRepository extends OrganizationBasedRepository<AssessmentSubmissionEntity> {
  /**
   * Get assessment submissions for an assessment.
   *
   * @param assessmentId
   * @param includeDrafts
   */
  public async getStudentSubmissions(assessmentId: string, includeDrafts = false) {
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
}

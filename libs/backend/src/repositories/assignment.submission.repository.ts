import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
import { AssignmentSubmissionStatus } from '@doorward/common/types/courses';

export default class AssignmentSubmissionRepository extends MultiOrganizationRepository<AssignmentSubmissionEntity> {
  async getNumberOfSubmissions(assignmentId: string, studentId: string): Promise<number> {
    return (await this.getAllSubmissions(assignmentId, studentId)).length;
  }

  async getAllSubmissions(assignmentId: string, studentId: string): Promise<AssignmentSubmissionEntity[]> {
    return this.createQueryBuilder('submission')
      .leftJoinAndSelect('submission.file', 'file')
      .where('submission."assignmentId" = :assignmentId', { assignmentId })
      .andWhere('submission."studentId" = :studentId', { studentId })
      .addOrderBy('submission."gradedOn"', 'DESC')
      .getMany();
  }

  /**
   * Check if this student can resubmit an assignment.
   *
   * An assignment is considered not resubmittable, if the last submission status is RESUBMIT
   * @param assignmentId
   * @param studentId
   */
  async canResubmit(assignmentId: string, studentId: string) {
    const submissions = await this.getAllSubmissions(assignmentId, studentId);
    return submissions.length && submissions[0].status === AssignmentSubmissionStatus.RESUBMIT;
  }

  getEntity(): ObjectType<AssignmentSubmissionEntity> {
    return AssignmentSubmissionEntity;
  }
}

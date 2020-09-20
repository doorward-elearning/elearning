import { Injectable, UnauthorizedException } from '@nestjs/common';
import UserEntity from '@doorward/common/entities/user.entity';
import AssignmentSubmissionRepository from '@repositories/assignment.submission.repository';
import ModuleItemsRepository from '@repositories/module.items.repository';
import { AssignmentSubmissionStatus } from '@doorward/common/types/courses';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    private submissionRepository: AssignmentSubmissionRepository,
    private itemRepository: ModuleItemsRepository
  ) {}

  async submitAssignment(
    assignmentId: string,
    body: SubmitAssignmentBody,
    author: UserEntity
  ): Promise<AssignmentSubmissionEntity> {
    const numSubmissions = await this.submissionRepository.getNumberOfSubmissions(assignmentId, author.id);

    if (numSubmissions > 0 && !(await this.submissionRepository.canResubmit(assignmentId, author.id))) {
      throw new UnauthorizedException('You are not allowed to submit this {{assignment}}.');
    }

    return await this.submissionRepository.save(
      this.submissionRepository.create({
        type: body.submissionType,
        submission: body.submission,
        status: body.status || AssignmentSubmissionStatus.DRAFT,
        numResubmissions: numSubmissions,
        resubmittedOn: numSubmissions > 0 ? new Date() : null,
        student: author,
        assignment: {
          id: assignmentId,
        },
      })
    );
  }
}

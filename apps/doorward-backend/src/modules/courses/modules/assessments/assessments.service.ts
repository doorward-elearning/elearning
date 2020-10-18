import { Injectable, NotFoundException } from '@nestjs/common';
import AssessmentSubmissionRepository from '@doorward/backend/repositories/assessment.submission.repository';
import { SaveAssessmentBody } from '@doorward/common/dtos/body';
import UserEntity from '@doorward/common/entities/user.entity';
import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';

@Injectable()
export class AssessmentsService {
  constructor(
    private submissionRepository: AssessmentSubmissionRepository,
    private assessmentRepository: AssessmentRepository
  ) {}

  public async getSubmission(assessmentId: string, user: UserEntity) {
    return this.submissionRepository.findOne({
      where: {
        assessment: { id: assessmentId },
        student: user,
      },
    });
  }

  public async saveAssessment(assessmentId: string, body: SaveAssessmentBody, user: UserEntity) {
    const assessment = await this.assessmentRepository.findOne(assessmentId);

    let submission = await this.getSubmission(assessmentId, user);

    if (submission) {
      submission.submission = body.submission;
      submission.assessmentTime = body.assessmentTime;

      await this.submissionRepository.save(submission);
    } else {
      submission = await this.submissionRepository.createAndSave({
        ...body,
        student: user,
        status: AssessmentSubmissionStatus.DRAFT,
        assessment,
      });
    }

    return submission;
  }

  public async submitAssessment(assessmentId: string, body: SaveAssessmentBody, user: UserEntity) {
    const submission = await this.getSubmission(assessmentId, user);

    if (submission) {
      submission.submission = body.submission;
      submission.assessmentTime = body.assessmentTime;
      submission.status = AssessmentSubmissionStatus.SUBMITTED;
      submission.submittedOn = new Date();

      await this.submissionRepository.save(submission);
    } else {
      throw new NotFoundException('{{assessment}} submission does not exist.');
    }
    return submission;
  }
}

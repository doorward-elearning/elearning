import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import AssessmentSubmissionRepository from '@doorward/backend/repositories/assessment.submission.repository';
import moment from 'moment';
import { SaveAssessmentBody } from '@doorward/common/dtos/body';
import UserEntity from '@doorward/common/entities/user.entity';
import AssessmentRepository from '@doorward/backend/repositories/assessment.repository';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import translate from '@doorward/common/lang/translate';
import assessmentGrader from '../../../../utils/assessment.grader';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import { Connection } from 'typeorm';
import { ORGANIZATION_CONNECTION } from '@doorward/backend/constants';

@Injectable()
export class AssessmentsService {
  constructor(
    private submissionRepository: AssessmentSubmissionRepository,
    private assessmentRepository: AssessmentRepository,
    @Inject(ORGANIZATION_CONNECTION) private connection: Connection
  ) {}

  private async getSubmissionByAssessmentId(assessmentId: string, user: UserEntity) {
    return this.submissionRepository.findOne({
      where: {
        assessment: { id: assessmentId },
        student: user,
      },
    });
  }

  public async getSubmission(assessmentId: string, user: UserEntity) {
    let submission = await this.getSubmissionByAssessmentId(assessmentId, user);

    if (submission) {
      if (submission.status === AssessmentSubmissionStatus.DRAFT) {
        const assessment = await this.assessmentRepository.findOne({ id: assessmentId });

        if (
          assessment.options.timeLimit.allow &&
          moment(submission.createdAt).add(assessment.options.timeLimit.minutes, 'minutes').isBefore(moment())
        ) {
          await this.submitAssessment(
            assessmentId,
            {
              submission: submission.submission,
            },
            user
          );
        }

        submission = await this.getSubmissionByAssessmentId(assessmentId, user);
      }
    }
    return submission;
  }

  /**
   * A function to help us know whether an assessment is a public exam
   * @param assessmentId
   */
  public async isPublicExam(assessmentId: string) {
    const assessment = await this.assessmentRepository.findOne(assessmentId);

    return assessment?.options?.publicExam?.allow;
  }

  public async saveAssessment(assessmentId: string, body: SaveAssessmentBody, user: UserEntity) {
    const assessment = await this.assessmentRepository.findOne(assessmentId);

    let submission = await this.getSubmission(assessmentId, user);

    if (submission) {
      if (submission.status === AssessmentSubmissionStatus.DRAFT) {
        submission.submission = body.submission;

        await this.submissionRepository.save(submission);
      } else {
        throw new BadRequestException('Cannot update a submitted assessment.');
      }
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
    let submission = await this.getSubmissionByAssessmentId(assessmentId, user);

    if (submission) {
      const startTime = moment(submission.createdAt);
      const currentTime = moment();
      submission.submission = body.submission;
      submission.assessmentTime = Math.abs(currentTime.diff(startTime, 'seconds'));
      submission.status = AssessmentSubmissionStatus.SUBMITTED;
      submission.submittedOn = new Date();

      await this.submissionRepository.save(submission);

      // grade the assessment
      await assessmentGrader(submission.id, this.connection);

      submission = await this.getSubmissionByAssessmentId(assessmentId, user);
    } else {
      throw new NotFoundException(translate('assessmentSubmissionDoesNotExist'));
    }
    return submission;
  }

  /**
   *
   * @param assessmentId
   */
  public async getStudentSubmissions(assessmentId: string): Promise<Array<AssessmentSubmissionEntity>> {
    return await this.submissionRepository.getStudentSubmissions(assessmentId);
  }

  /**
   *
   * @param submissionId
   */
  public async getStudentSubmission(submissionId: string): Promise<AssessmentSubmissionEntity> {
    return this.submissionRepository.getStudentSubmission(submissionId);
  }
}

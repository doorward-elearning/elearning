import DApiResponse from '@doorward/common/dtos/response/base.response';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';

export class AssessmentSubmissionResponse extends DApiResponse {
  submission: AssessmentSubmissionEntity;
}

export class AssessmentSubmissionsResponse extends DApiResponse {
  submissions: Array<AssessmentSubmissionEntity>;
}

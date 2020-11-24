import DApiResponse from '@doorward/common/dtos/response/base.response';
import AssessmentSubmissionModel from '@doorward/common/models/assessment.submission.model';

export class AssessmentSubmissionResponse extends DApiResponse {
  submission: AssessmentSubmissionModel;
}

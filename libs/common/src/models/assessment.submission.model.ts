import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import { AssignmentSubmissionStatus } from '@doorward/common/types/courses';
import AssessmentModel from '@doorward/common/models/assessment.model';
import UserModel from '@doorward/common/models/user.model';

export default interface AssessmentSubmissionModel extends BaseOrganizationModel {
  submission: string;
  assessmentTime: number;
  status: AssignmentSubmissionStatus;
  gradedOn: Date;
  submittedOn: Date;
  grade: number;
  student: UserModel;
  assessment: AssessmentModel;
  grader: UserModel;
}

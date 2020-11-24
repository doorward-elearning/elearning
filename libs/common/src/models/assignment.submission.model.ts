import BaseOrganizationModel from '@doorward/common/models/base.organization.model';
import { AssignmentSubmissionStatus, AssignmentSubmissionType } from '@doorward/common/types/courses';
import AssignmentModel from '@doorward/common/models/assignment.model';
import UserModel from "@doorward/common/models/user.model";
import FileModel from '@doorward/common/models/file.model';

export default interface AssignmentSubmissionModel extends BaseOrganizationModel {
  type: AssignmentSubmissionType;
  submission: string;
  points: number;
  status: AssignmentSubmissionStatus;
  numResubmissions: number;
  gradedOn: Date;
  resubmittedOn: Date;
  grade: number;
  student: UserModel;
  assignment: AssignmentModel;
  grader: UserModel;
  file: FileModel;
}

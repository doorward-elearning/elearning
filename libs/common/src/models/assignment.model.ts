import { AssignmentOptions } from '@doorward/common/types/assignments';
import AssignmentSubmissionModel from '@doorward/common/models/assignment.submission.model';
import ModuleItemModel from '@doorward/common/models/module.item.model';

export default interface AssignmentModel extends ModuleItemModel {
  options: AssignmentOptions;
  assignment: string;
  assignmentSubmissions: Array<AssignmentSubmissionModel>;
}

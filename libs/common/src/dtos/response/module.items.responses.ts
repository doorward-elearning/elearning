import { Expose } from 'class-transformer';
import AssignmentSubmissionModel from '@doorward/common/models/assignment.submission.model';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import ModuleItemModel from '@doorward/common/models/module.item.model';

export class AssignmentSubmissionResponse extends DApiResponse {
  @Expose()
  assignmentSubmission: AssignmentSubmissionModel;
}

export class ModuleItemResponse extends DApiResponse {
  @Expose()
  item: ModuleItemModel;
}

export class ModuleItemsResponse extends DApiResponse {
  @Expose()
  items: ModuleItemModel[];
}

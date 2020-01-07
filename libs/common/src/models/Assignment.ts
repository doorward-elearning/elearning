import { ModuleItem } from '@edudoor/common/models/ModuleItem';
import { AssignmentSubmissionType } from '@edudoor/common/models/index';

export interface Assignment extends ModuleItem {
  content: {
    points: number;
    submissionMedia: 'online' | 'offline';
    submissionType: Array<AssignmentSubmissionType>;
    dueDate: string | Date | null;
    assignment: any;
    availability: {
      from: string | Date | null;
      to: string | Date | null;
    };
  };
}

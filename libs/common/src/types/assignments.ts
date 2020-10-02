import { AssignmentSubmissionMedia, AssignmentSubmissionType } from '@doorward/common/types/courses';

export type AssignmentOptions = {
  dueDate: string | Date;
  submissionTypes: Array<AssignmentSubmissionType>;
  points: number;
  availability: {
    to: string | Date;
    from: string | Date;
  };
  submissionMedia: AssignmentSubmissionMedia;
};

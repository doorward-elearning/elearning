import { AssignmentSubmissionMedia, AssignmentSubmissionType } from '@doorward/common/types/courses';

export type AssignmentOptions = {
  dueDate: string;
  submissionType: AssignmentSubmissionType;
  points: number;
  availability: {
    to: string;
    from: string;
  };
  submissionMedia: AssignmentSubmissionMedia;
};

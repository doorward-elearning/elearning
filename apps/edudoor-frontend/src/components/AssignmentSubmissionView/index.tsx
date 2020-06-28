import React from 'react';
import IfElse from '@edudoor/ui/components/IfElse';
import { AssignmentSubmissionType } from '@edudoor/common/models';
import { Link } from 'react-router-dom';
import Button from '@edudoor/ui/components/Buttons/Button';
import Api from '../../services/api';
import { AssignmentSubmission } from '@edudoor/common/models/AssignmentSubmission';

const AssignmentSubmissionView: React.FunctionComponent<AssignmentSubmissionViewProps> = ({
  submission,
}): JSX.Element => {
  return (
    <div>
      <IfElse condition={submission.submissionType === AssignmentSubmissionType.TEXT_ENTRY}>
        <div>{submission.submission}</div>
      </IfElse>
      <IfElse condition={submission.submissionType === AssignmentSubmissionType.WEBSITE_URL}>
        <Link to={submission.submission} target="_blank">
          {submission.submission}
        </Link>
      </IfElse>
      <IfElse condition={submission.submissionType === AssignmentSubmissionType.FILE_UPLOAD}>
        <div>
          <span>{submission.file?.name}</span>
          <Button
            onClick={() => {
              window.location.href = Api.fileURL(submission.submission, true);
            }}
            icon="cloud_download"
          >
            Download Assignment
          </Button>
        </div>
      </IfElse>
    </div>
  );
};

export interface AssignmentSubmissionViewProps {
  submission: AssignmentSubmission;
}

export default AssignmentSubmissionView;

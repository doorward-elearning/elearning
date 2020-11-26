import React from 'react';
import IfElse from '@doorward/ui/components/IfElse';
import { Link } from 'react-router-dom';
import Button from '@doorward/ui/components/Buttons/Button';
import Api from '../../services/api';
import { AssignmentSubmissionType } from '@doorward/common/types/courses';
import AssignmentSubmissionModel from '@doorward/common/entities/assignment.submission.entity';
import translate from '@doorward/common/lang/translate';

const AssignmentSubmissionView: React.FunctionComponent<AssignmentSubmissionViewProps> = ({
  submission,
}): JSX.Element => {
  return (
    <div>
      <IfElse condition={submission.type === AssignmentSubmissionType.TEXT_ENTRY}>
        <div>{submission.submission}</div>
      </IfElse>
      <IfElse condition={submission.type === AssignmentSubmissionType.WEBSITE_URL}>
        <Link to={submission.submission} target="_blank">
          {submission.submission}
        </Link>
      </IfElse>
      <IfElse condition={submission.type === AssignmentSubmissionType.FILE_UPLOAD}>
        <div>
          <span>{submission.file?.name}</span>
          <Button
            onClick={() => {
              window.location.href = Api.fileURL(submission.submission, true);
            }}
            icon="cloud_download"
          >
            {translate.downloadAssignment()}
          </Button>
        </div>
      </IfElse>
    </div>
  );
};

export interface AssignmentSubmissionViewProps {
  submission: AssignmentSubmissionModel;
}

export default AssignmentSubmissionView;

import React from 'react';
import IfElse from '@doorward/ui/components/IfElse';
import { Link } from 'react-router-dom';
import Button from '@doorward/ui/components/Buttons/Button';
import { AssignmentSubmissionType } from '@doorward/common/types/courses';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
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
          <Button onClick={() => {}} icon="cloud_download">
            {translate('downloadAssignment')}
          </Button>
        </div>
      </IfElse>
    </div>
  );
};

export interface AssignmentSubmissionViewProps {
  submission: AssignmentSubmissionEntity;
}

export default AssignmentSubmissionView;

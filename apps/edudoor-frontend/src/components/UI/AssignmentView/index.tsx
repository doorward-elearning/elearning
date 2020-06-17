import React from 'react';
import DraftHTMLContent from '@edudoor/ui/components/DraftHTMLContent';
import { Assignment } from '@edudoor/common/models/Assignment';
import Panel from '@edudoor/ui/components/Panel';
import Header from '@edudoor/ui/components/Header';
import RoleContainer from '@edudoor/ui/components/RolesManager/RoleContainer';
import { Roles } from '@edudoor/ui/components/RolesManager';
import { useHistory } from 'react-router';
import IfElse from '@edudoor/ui/components/IfElse';
import AssignmentSubmissionForm from '../../Forms/AssignmentSubmissionForm';
import { AssignmentSubmissionType } from '@edudoor/common/models';
import { Link } from 'react-router-dom';
import Api from '../../../services/api';
import Button from '@edudoor/ui/components/Buttons/Button';

const AssignmentView: React.FunctionComponent<AssignmentViewProps> = props => {
  const initialValues = {
    submission: '',
    submissionType: '',
  };
  const history = useHistory();

  const submission = props.assignment?.assignmentSubmission;
  return (
    <div className="assignment-view">
      <Header size={2} style={{ paddingBottom: 'var(--padding-lg)' }}>
        Description
      </Header>
      <DraftHTMLContent content={props.assignment.content.assignment} />
      <RoleContainer roles={[Roles.STUDENT]} showSuperAdmin={false}>
        <div style={{ marginTop: 'var(--padding-lg)' }}>
          <Header size={3}>Submission</Header>
        </div>
        <Panel style={{ marginTop: 'var(--padding-lg)' }} noBackground>
          {submission ? (
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
          ) : (
            <AssignmentSubmissionForm
              assignment={props.assignment}
              initialValues={initialValues}
              onSuccess={history.goBack}
            />
          )}
        </Panel>
      </RoleContainer>
    </div>
  );
};

export interface AssignmentViewProps {
  assignment: Assignment;
}

export default AssignmentView;

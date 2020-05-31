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

const AssignmentView: React.FunctionComponent<AssignmentViewProps> = props => {
  const initialValues = {
    submission: '',
    submissionType: '',
  };
  const history = useHistory();
  return (
    <div className="assignment-view">
      <DraftHTMLContent content={props.assignment.content.assignment} />
      <RoleContainer roles={[Roles.STUDENT]} showSuperAdmin={false}>
        <Panel style={{ marginTop: 'var(--padding-lg)' }} noBackground>
          <Header size={3}>Submission</Header>
          <IfElse condition={props.assignment.assignmentSubmission}>
            <div></div>
            <AssignmentSubmissionForm
              assignment={props.assignment}
              initialValues={initialValues}
              onSuccess={history.goBack}
            />
          </IfElse>
        </Panel>
      </RoleContainer>
    </div>
  );
};

export interface AssignmentViewProps {
  assignment: Assignment;
}

export default AssignmentView;

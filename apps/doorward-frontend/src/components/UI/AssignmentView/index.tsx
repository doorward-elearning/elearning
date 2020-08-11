import React, { useEffect, useState } from 'react';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import { Assignment } from '@doorward/common/models/Assignment';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';
import { useHistory } from 'react-router';
import AssignmentSubmissionForm from '../../Forms/AssignmentSubmissionForm';
import AssignmentSubmissionView from '../../AssignmentSubmissionView';
import WebComponent from '@doorward/ui/components/WebComponent';
import Table from '@doorward/ui/components/Table';
import Tools from '@doorward/common/utils/Tools';
import AssignmentSubmissionModal from '../../Modals/AssignmentSubmissionModal';
import useModal from '@doorward/ui/hooks/useModal';

const AssignmentView: React.FunctionComponent<AssignmentViewProps> = props => {
  const initialValues = {
    submission: '',
    submissionType: '',
  };
  const history = useHistory();
  const viewAssignmentSubmissionModal = useModal(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  useEffect(() => {
    if (currentSubmission) {
      viewAssignmentSubmissionModal.openModal();
    }
  }, [currentSubmission]);

  const submission = props.assignment?.assignmentSubmission;
  return (
    <div className="assignment-view">
      <Header size={2} style={{ paddingBottom: 'var(--padding-lg)' }}>
        Description
      </Header>
      <DraftHTMLContent content={props.assignment.content.assignment} />
      <RoleContainer roles={[Roles.MEMBER]} showSuperAdmin={false}>
        <div style={{ marginTop: 'var(--padding-lg)' }}>
          <Header size={3}>Submission</Header>
        </div>
        <Panel style={{ marginTop: 'var(--padding-lg)' }} noBackground>
          {submission ? (
            <AssignmentSubmissionView submission={submission} />
          ) : (
            <AssignmentSubmissionForm
              assignment={props.assignment}
              initialValues={initialValues}
              onSuccess={history.goBack}
            />
          )}
        </Panel>
      </RoleContainer>
      <RoleContainer roles={[Roles.TEACHER]}>
        <Header size={2} style={{ paddingBottom: 'var(--padding-lg)', paddingTop: 'var(--padding-lg)' }}>
          Submissions
        </Header>
        <AssignmentSubmissionModal submission={currentSubmission} useModal={viewAssignmentSubmissionModal} />
        <WebComponent
          data={props.assignment?.assignmentSubmissions}
          loading={false}
          emptyMessage="No member has submitted their assignment."
          size="medium"
          icon="assessment"
        >
          {submissions => {
            return (
              <div>
                <Table
                  data={submissions}
                  onRowClick={row => {
                    setCurrentSubmission(row);
                  }}
                  columns={{
                    member: 'Member',
                    submittedOn: 'Date',
                    submittedAt: 'Time',
                    submissionType: 'Type',
                  }}
                  getCell={row => ({
                    member: row.member.fullName,
                    submittedOn: Tools.normalDate(row.createdAt),
                    submittedAt: Tools.normalTime(row.createdAt),
                    type: row.submissionType,
                  })}
                />
              </div>
            );
          }}
        </WebComponent>
      </RoleContainer>
    </div>
  );
};

export interface AssignmentViewProps {
  assignment: Assignment;
}

export default AssignmentView;

import React, { useEffect, useState } from 'react';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import AssignmentSubmissionForm from '../../Forms/AssignmentSubmissionForm';
import AssignmentSubmissionView from '../../AssignmentSubmissionView';
import WebComponent from '@doorward/ui/components/WebComponent';
import Table from '@doorward/ui/components/Table';
import Tools from '@doorward/common/utils/Tools';
import AssignmentSubmissionModal from '../../Modals/AssignmentSubmissionModal';
import useModal from '@doorward/ui/hooks/useModal';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';
import translate from '@doorward/common/lang/translate';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const AssignmentView: React.FunctionComponent<AssignmentViewProps> = (props) => {
  const initialValues = {
    submission: '',
    submissionType: '',
  };
  const navigation = useNavigation();
  const viewAssignmentSubmissionModal = useModal(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  useEffect(() => {
    if (currentSubmission) {
      viewAssignmentSubmissionModal.openModal();
    }
  }, [currentSubmission]);

  const submission = props.assignment?.assignmentSubmissions?.[0];
  return (
    <div className="assignment-view">
      <Header size={2} style={{ paddingBottom: 'var(--padding-lg)' }}>
        {translate('description')}
      </Header>
      <DraftHTMLContent content={props.assignment.assignment} />
      <RoleContainer privileges={['assignments.submit']}>
        <div style={{ marginTop: 'var(--padding-lg)' }}>
          <Header size={3}>{translate('submission')}</Header>
        </div>
        <Panel style={{ marginTop: 'var(--padding-lg)' }} noBackground>
          {submission ? (
            <AssignmentSubmissionView submission={submission} />
          ) : (
            <AssignmentSubmissionForm
              assignment={props.assignment}
              initialValues={initialValues}
              onSuccess={navigation.goBack}
            />
          )}
        </Panel>
      </RoleContainer>
      <RoleContainer privileges={['assignments.grade']}>
        <Header size={2} style={{ paddingBottom: 'var(--padding-lg)', paddingTop: 'var(--padding-lg)' }}>
          {translate('submission', {
            count: props.assignment?.assignmentSubmissions?.length,
          })}
        </Header>
        <AssignmentSubmissionModal submission={currentSubmission} useModal={viewAssignmentSubmissionModal} />
        <WebComponent
          data={props.assignment?.assignmentSubmissions}
          loading={false}
          emptyMessage={translate('noStudentHasSubmittedTheirAssignment')}
          size="medium"
          icon="assessment"
        >
          {(submissions) => {
            return (
              <div>
                <Table
                  data={submissions}
                  onRowClick={(row) => {
                    setCurrentSubmission(row);
                  }}
                  columns={{
                    student: {
                      title: translate('student'),
                      cellRenderer: ({ rowData }) => rowData.student.fullName,
                    },
                    submittedOn: {
                      title: translate('date'),
                      cellRenderer: ({ rowData }) => Tools.normalDate(rowData.createdAt),
                    },
                    submittedAt: {
                      title: translate('time'),
                      cellRenderer: ({ rowData }) => Tools.normalTime(rowData.createdAt),
                    },
                    submissionType: {
                      title: translate('type'),
                      cellRenderer: ({ rowData }) => rowData.type,
                    },
                  }}
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
  assignment: AssignmentEntity;
}

export default AssignmentView;

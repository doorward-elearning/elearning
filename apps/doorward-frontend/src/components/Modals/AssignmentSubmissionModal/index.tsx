import React from 'react';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import AssignmentSubmissionView from '../../AssignmentSubmissionView';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';
import translate from '@doorward/common/lang/translate';

const AssignmentSubmissionModal: React.FunctionComponent<AssignmentSubmissionModalProps> = (props): JSX.Element => {
  return (
    <Modal {...props}>
      <Modal.Header
        title={translate.assignmentSubmissionForStudent({
          fullName: props.submission?.student?.fullName,
        })}
      />
      <Modal.Body>{props.submission && <AssignmentSubmissionView submission={props.submission} />}</Modal.Body>
    </Modal>
  );
};

export interface AssignmentSubmissionModalProps extends ModalProps {
  submission: AssignmentSubmissionEntity;
}

export default AssignmentSubmissionModal;

import React from 'react';
import { AssignmentSubmission } from '@edudoor/common/models/AssignmentSubmission';
import Modal, { ModalProps } from '@edudoor/ui/components/Modal';
import AssignmentSubmissionView from '../../AssignmentSubmissionView';

const AssignmentSubmissionModal: React.FunctionComponent<AssignmentSubmissionModalProps> = (props): JSX.Element => {
  return (
    <Modal {...props}>
      <Modal.Header title={`Assignment Submission - ${props.submission?.student?.fullName}`} />
      <Modal.Body>{props.submission && <AssignmentSubmissionView submission={props.submission} />}</Modal.Body>
    </Modal>
  );
};

export interface AssignmentSubmissionModalProps extends ModalProps {
  submission: AssignmentSubmission;
}

export default AssignmentSubmissionModal;

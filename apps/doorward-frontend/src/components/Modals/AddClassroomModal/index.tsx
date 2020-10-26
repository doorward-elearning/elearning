import React from 'react';
import { UseModal } from '@doorward/ui/hooks/useModal';
import Modal from '@doorward/ui/components/Modal';
import AddClassroomForm from '../../Forms/AddClassroomForm';
import translate from '@doorward/common/lang/translate';

const AddClassroomModal: React.FunctionComponent<AddClassroomModalProps> = (props): JSX.Element => {
  return (
    <Modal useModal={props.modal}>
      <Modal.Header title={translate.addClassroom()} />
      <Modal.Body>
        <AddClassroomForm schoolId={props.schoolId} onSuccess={props.onSuccess} onCancel={props.modal.closeModal} />
      </Modal.Body>
    </Modal>
  );
};

export interface AddClassroomModalProps {
  onSuccess: () => void;
  modal: UseModal;
  schoolId: string;
}

export default AddClassroomModal;

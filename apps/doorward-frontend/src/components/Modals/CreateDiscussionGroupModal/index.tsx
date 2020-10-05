import React from 'react';
import Modal from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import AddDiscussionGroupForm from '../../Forms/AddDiscussionGroupForm';
import useForm from '@doorward/ui/hooks/useForm';

const CreateDiscussionGroupModal: React.FunctionComponent<CreateDiscussionGroupModalProps> = (props): JSX.Element => {
  const form = useForm();
  return (
    <Modal useModal={props.modal}>
      <Modal.Header title="Add Discussion Group" />
      <Modal.Body>
        <AddDiscussionGroupForm form={form} onSuccess={props.modal.closeModal} courseId={props.courseId} />
      </Modal.Body>
    </Modal>
  );
};

export interface CreateDiscussionGroupModalProps {
  modal: UseModal;
  courseId: string;
}

export default CreateDiscussionGroupModal;

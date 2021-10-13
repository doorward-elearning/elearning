import React from 'react';
import Modal from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import AddDiscussionGroupForm from '../../Forms/AddDiscussionGroupForm';
import useForm from '@doorward/ui/hooks/useForm';
import translate from '@doorward/common/lang/translate';
import CourseEntity from '@doorward/common/entities/course.entity';
import AddDescriptionForm from '../../Forms/AddDescriptionFrom';

const AddDescriptionModal: React.FunctionComponent<AddDescriptionModalProps> = (props): JSX.Element => {
  const form = useForm();
  return (
    <Modal useModal={props.modal}>
      <Modal.Header title={translate('addDescription')} />
      <Modal.Body>
        <AddDescriptionForm form={form} onSuccess={props.modal.closeModal} course={props.course} />
      </Modal.Body>
    </Modal>
  );
};

export interface AddDescriptionModalProps {
  modal: UseModal;
  course: CourseEntity;
}

export default AddDescriptionModal;

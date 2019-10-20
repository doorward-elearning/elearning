import React from 'react';
import Modal, { ModalProps } from '../../components/Modal';

const AddCourseModal: React.FunctionComponent<AddCourseModalProps> = props => {
  return (
    <Modal useModal={props.useModal}>
      <Modal.Header title="Add course"/>
    </Modal>
  );
};

export interface AddCourseModalProps extends ModalProps {}

export default AddCourseModal;

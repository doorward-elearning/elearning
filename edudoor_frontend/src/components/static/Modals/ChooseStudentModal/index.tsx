import React from 'react';
import Modal, { ModalProps } from '../../../ui/Modal';
import ChooseStudentForm, { ChooseStudentFormState } from '../../Forms/ChooseStudentForm';
import useForm from '../../../../hooks/useForm';

const ChooseStudentModal: React.FunctionComponent<ChooseStudentModalProps> = props => {
  const form = useForm<ChooseStudentFormState>();
  const { formikProps } = form;
  return (
    <Modal {...props}>
      <Modal.Header title="Add Student to course" />
      <Modal.Body>
        <ChooseStudentForm form={form} />
      </Modal.Body>
      <Modal.Footer buttons={{ positive: 'Save' }} onPositiveClick={formikProps && formikProps.submitForm} />
    </Modal>
  );
};

export interface ChooseStudentModalProps extends ModalProps {}

export default ChooseStudentModal;

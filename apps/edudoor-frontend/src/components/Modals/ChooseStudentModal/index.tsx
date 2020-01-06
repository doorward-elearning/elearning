import React from 'react';
import ChooseStudentForm, { ChooseStudentFormState } from '../../Forms/ChooseStudentForm';
import useForm from '@edudoor/ui/hooks/useForm';
import Modal, { ModalProps } from '@edudoor/ui/components/Modal';

const ChooseStudentModal: React.FunctionComponent<ChooseStudentModalProps> = props => {
  const form = useForm<ChooseStudentFormState>();
  const { formikProps } = form;
  return (
    <Modal {...props}>
      <Modal.Header title="Add Student to course" />
      <Modal.Body>
        <ChooseStudentForm form={form} courseId={props.courseId} onSuccess={props.onSuccess} />
      </Modal.Body>
      <Modal.Footer buttons={{ positive: 'Save' }} onPositiveClick={formikProps && formikProps.submitForm} />
    </Modal>
  );
};

export interface ChooseStudentModalProps extends ModalProps {
  courseId: string;
  onSuccess: () => void;
}

export default ChooseStudentModal;

import React, { useEffect } from 'react';
import AddModuleForm, { AddModuleFormState } from '../../Forms/AddModuleForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '@edudoor/ui/hooks/useForm';
import Modal, { ModalProps } from '@edudoor/ui/components/Modal';
import { UseModal } from '@edudoor/ui/hooks/useModal';
import Header from '@edudoor/ui/components/Header';

const AddCourseModuleModal: React.FunctionComponent<AddCourseModuleModalProps> = props => {
  const form = useForm<AddModuleFormState>();
  const { formikProps } = form;

  const state = useSelector((state: State) => state.courses.createModule);

  useEffect(() => {
    if (state.data.module) {
      props.useModal.closeModal();
    }
  }, [state.data]);

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
  });
  return (
    <Modal {...props}>
      <Modal.Header>
        <Header size={2}>Add Course Module</Header>
      </Modal.Header>
      <Modal.Body>
        <AddModuleForm courseId={props.courseId} useForm={form} />
      </Modal.Body>
      <Modal.Footer buttons={{ positive: 'Save' }} onPositiveClick={formikProps && formikProps.submitForm} />
    </Modal>
  );
};

export interface AddCourseModuleModalProps extends ModalProps {
  courseId: string;
  useModal: UseModal;
}

export default AddCourseModuleModal;

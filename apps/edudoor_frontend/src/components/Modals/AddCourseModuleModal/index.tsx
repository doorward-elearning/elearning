import React, { useEffect } from 'react';
import Modal, { ModalProps } from '../../../../../../libs/ui/components/Modal';
import Header from '../../../../../../libs/ui/components/Header';
import useForm from '../../../../../../libs/ui/hooks/useForm';
import AddModuleForm, { AddModuleFormState } from '../../Forms/AddModuleForm';
import { UseModal } from '../../../../../../libs/ui/hooks/useModal';
import { useSelector } from 'react-redux';
import { State } from '../../../store';

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

import React, { useEffect } from 'react';
import AddModuleForm, { AddModuleFormState } from '../../Forms/AddModuleForm';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import useDoorwardApi from '../../../hooks/useDoorwardApi';

const AddCourseModuleModal: React.FunctionComponent<AddCourseModuleModalProps> = (props) => {
  const form = useForm<AddModuleFormState>();
  const { formikProps } = form;

  const state = useDoorwardApi((state) => state.courses.createCourseModule);

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
      <Modal.Header title="Add Course Module" />
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

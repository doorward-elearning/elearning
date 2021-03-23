import React from 'react';
import AddCourseForm, { AddCourseFormState } from '../../Forms/AddCourseForm';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { CourseResponse } from '@doorward/common/dtos/response';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const AddCourseModal: React.FunctionComponent<AddCourseModalProps> = (props) => {
  const form = useForm<AddCourseFormState>();
  const { formikProps } = form;
  const navigation = useNavigation();

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
    navigation.navigate(ROUTES.courses.list);
  });

  return (
    <Modal {...props}>
      <Modal.Header title={props.title} />
      <Modal.Body>
        <AddCourseForm onSuccess={props.onSuccess} useModal={props.useModal} title={props.title} useForm={form} />
      </Modal.Body>
    </Modal>
  );
};

export interface AddCourseModalProps extends ModalProps {
  onSuccess: (response: CourseResponse) => void;
  title: string;
}

export default AddCourseModal;

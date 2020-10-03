import React from 'react';
import AddCourseForm, { AddCourseFormState } from '../../Forms/AddCourseForm';
import { useHistory } from 'react-router';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { CourseResponse } from '@doorward/common/dtos/response';
import useRoutes from '../../../hooks/useRoutes';

const AddCourseModal: React.FunctionComponent<AddCourseModalProps> = (props) => {
  const form = useForm<AddCourseFormState>();
  const { formikProps } = form;
  const history = useHistory();
  const routes = useRoutes();

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
    history.push(routes.courseList.link);
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

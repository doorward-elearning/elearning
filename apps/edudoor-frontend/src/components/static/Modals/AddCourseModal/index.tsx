import React from 'react';
import Modal, { ModalProps } from '../../../ui/Modal';
import useForm from '../../../../hooks/useForm';
import AddCourseForm, { AddCourseFormState } from '../../Forms/AddCourseForm';
import { useHistory } from 'react-router';
import ROUTES from '../../../../routes/routes';
import { OnFormSubmit } from '../../../../types';

const AddCourseModal: React.FunctionComponent<AddCourseModalProps> = props => {
  const form = useForm<AddCourseFormState>();
  const { formikProps } = form;
  const history = useHistory();

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
    history.push(ROUTES.courseList.link);
  });
  return (
    <Modal {...props}>
      <Modal.Header title={props.title} />
      <Modal.Body>
        <AddCourseForm onSubmit={props.onSubmit} useModal={props.useModal} title={props.title} useForm={form} />
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: 'Save' }}
        onPositiveClick={formikProps && formikProps.submitForm}
        props={{ positive: { disabled: !(formikProps && formikProps.isValid), type: 'submit' } }}
      />
    </Modal>
  );
};

export interface AddCourseModalProps extends ModalProps {
  onSubmit: OnFormSubmit<AddCourseFormState>;
  title: string;
}

export default AddCourseModal;

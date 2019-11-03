import React from 'react';
import Modal, { ModalProps } from '../../../ui/Modal';
import Form from '../../../ui/Form';

const AddStudentForm: React.FunctionComponent<AddStudentFormProps> = props => {
  const initialValues = {};
  return <Modal {...props}></Modal>;
};

export interface AddStudentFormProps extends ModalProps {}

export default AddStudentForm;

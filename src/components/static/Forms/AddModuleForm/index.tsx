import React from 'react';
import Form from '../../../ui/Form';
import { FormikProps } from 'formik';
import TextField from '../../../ui/Input/TextField';
import Modal, { ModalProps } from '../../../ui/Modal';
import Header from '../../../ui/Header';
import addModuleForm from '../validations/addModuleForm';

const AddModuleForm: React.FunctionComponent<AddModuleFormProps> = props => {
  const initialValues = {
    name: '',
  };

  const onSubmit = () => {
    props.useModal.closeModal();
  };
  return (
    <Modal {...props}>
      <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={addModuleForm}>
        {(formikProps: FormikProps<AddModuleFormState>): JSX.Element => {
          return (
            <React.Fragment>
              <Modal.Header>
                <Header size={2}>Add Course Module</Header>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={formikProps.submitForm}>
                  <TextField name="name" label="Module Name" icon="calendar_view_day" />
                </form>
              </Modal.Body>
              <Modal.Footer buttons={{ positive: 'Save' }} onPositiveClick={formikProps.submitForm} />
            </React.Fragment>
          );
        }}
      </Form>
    </Modal>
  );
};

export interface AddModuleFormState {
  name: string;
}

export interface AddModuleFormProps extends ModalProps {}
export default AddModuleForm;

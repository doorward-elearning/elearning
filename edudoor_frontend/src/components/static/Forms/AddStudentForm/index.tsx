import React from 'react';
import Modal, { ModalProps } from '../../../ui/Modal';
import List from '../../../ui/List';
import ListItem from '../../../ui/List/ListItem';
import Row from '../../../ui/Row';
import Checkbox from '../../../ui/Input/Checkbox';
import Form from '../../../ui/Form';
import { FormikProps } from 'formik';
import SwitchInput from '../../../ui/Input/SwitchInput';

const AddStudentForm: React.FunctionComponent<AddStudentFormProps> = props => {
  const initialValues = {
    students: [
      { name: 'John Doe', id: '12' },
      { name: 'Jane Doe', id: '13' },
      { name: 'John Doe', id: '12' },
      { name: 'John Doe', id: '12' },
      { name: 'John Doe', id: '12' },
      { name: 'John Doe', id: '12' },
      { name: 'John Doe', id: '12' },
      { name: 'John Doe', id: '12' },
      { name: 'Jane Doe', id: '13' },
      { name: 'Jane Doe', id: '13' },
      { name: 'Jane Doe', id: '13' },
      { name: 'Jane Doe', id: '13' },
      { name: 'John Doe', id: '12' },
      { name: 'Jane Doe', id: '13' },
      { name: 'Jane Doe', id: '13' },
      { name: 'Jane Doe', id: '13' },
    ],
  };

  const onSubmit = () => {
    props.useModal.closeModal();
  };
  return (
    <Modal {...props}>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {(formikProps: FormikProps<AddStudentFormState>): JSX.Element => {
          return (
            <React.Fragment>
              <Modal.Header title="Add Student" />
              <Modal.Body>
                <List>
                  {formikProps.values.students.map((student, index) => (
                    <ListItem key={index}>
                      <Row>
                        <span>{student.name}</span>
                        <SwitchInput name={`students.${index}.id`} />
                      </Row>
                    </ListItem>
                  ))}
                </List>
              </Modal.Body>
              <Modal.Footer buttons={{ positive: 'Save' }} onPositiveClick={formikProps.submitForm} />
            </React.Fragment>
          );
        }}
      </Form>
    </Modal>
  );
};

export interface AddStudentFormState {
  students: Array<{ name: string; id: string }>;
}

export interface AddStudentFormProps extends ModalProps {}

export default AddStudentForm;

import React from 'react';
import List from '../../../ui/List';
import ListItem from '../../../ui/List/ListItem';
import Row from '../../../ui/Row';
import Form from '../../../ui/Form';
import SwitchInput from '../../../ui/Input/SwitchInput';
import { UseForm } from '../../../../hooks/useForm';

const ChooseStudentForm: React.FunctionComponent<ChooseStudentFormProps> = props => {
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

  const onSubmit = () => {};

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} form={props.form}>
      {(formikProps): JSX.Element => (
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
      )}
    </Form>
  );
};

export interface ChooseStudentFormState {
  students: Array<{ name: string; id: string }>;
}

export interface ChooseStudentFormProps {
  form: UseForm<ChooseStudentFormState>;
}

export default ChooseStudentForm;

import React, { useEffect } from 'react';
import List from '../../../ui/List';
import ListItem from '../../../ui/List/ListItem';
import Row from '../../../ui/Row';
import Form from '../../../ui/Form';
import SwitchInput from '../../../ui/Input/SwitchInput';
import { UseForm } from '../../../../hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import useAction from '../../../../hooks/useActions';
import { fetchStudentListAction } from '../../../../reducers/students/actions';
import { Student } from '../../../../services/models';
import WebComponent from '../../../ui/WebComponent';

const ChooseStudentForm: React.FunctionComponent<ChooseStudentFormProps> = props => {
  const studentList = useSelector((state: State) => state.students.studentList);
  const fetchStudents = useAction(fetchStudentListAction);
  useEffect(() => {
    fetchStudents();
  }, []);

  const onSubmit = () => {};

  return (
    <WebComponent data={studentList.data.students} loading={studentList.fetching}>
      {students => (
        <Form initialValues={{ students }} onSubmit={onSubmit} form={props.form}>
          {(formikProps): JSX.Element => (
            <List>
              {formikProps.values.students.map((student, index) => (
                <ListItem key={index}>
                  <Row>
                    <span>{student.firstName + ' ' + student.lastName}</span>
                    <SwitchInput name={`students.${index}.id`} />
                  </Row>
                </ListItem>
              ))}
            </List>
          )}
        </Form>
      )}
    </WebComponent>
  );
};

export interface ChooseStudentFormState {
  students: Array<Student>;
}

export interface ChooseStudentFormProps {
  form: UseForm<ChooseStudentFormState>;
}

export default ChooseStudentForm;

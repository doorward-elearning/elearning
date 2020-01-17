import React, { useEffect } from 'react';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useAction from '@edudoor/ui/hooks/useActions';
import './ChooseStudentForm.scss';
import { fetchStudentsNotRegisteredAction, registerStudents } from '../../../reducers/courses/actions';
import Tools from '@edudoor/common/utils/Tools';
import { Student } from '@edudoor/common/models/Student';
import ChooseItemsForm from '../ChooseItemsForm';

const ChooseStudentForm: React.FunctionComponent<ChooseStudentFormProps> = props => {
  const studentList = useSelector((state: State) => state.courses.notRegistered);
  const fetchStudents = useAction(fetchStudentsNotRegisteredAction);
  const { courseId } = props;

  useEffect(() => {
    fetchStudents(courseId);
  }, []);

  const onSuccess = () => {
    fetchStudents(courseId);
    props.onSuccess();
  };

  const state = useSelector((state: State) => state.courses.registerStudents);

  return (
    <ChooseItemsForm
      items={studentList.data.students}
      state={state}
      form={props.form}
      onSuccess={onSuccess}
      submitAction={registerStudents}
      createData={values => [
        courseId,
        {
          students: values.items
            .filter(student => {
              return student.selected;
            })
            .map(student => student.id),
        },
      ]}
      columns={{
        username: 'Username',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
      }}
    />
  );
};

export interface ChooseStudentFormState {
  students: Array<{ selected: boolean } & Student>;
}

export interface ChooseStudentFormProps {
  form: UseForm<ChooseStudentFormState>;
  courseId: string;
  onSuccess: () => void;
}

export default ChooseStudentForm;

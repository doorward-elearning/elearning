import React, { useEffect } from 'react';
import SwitchInput from '@edudoor/ui/src/components/Input/SwitchInput';
import { UseForm } from '@edudoor/ui/src/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useAction from '@edudoor/ui/src/hooks/useActions';
import { Student } from '../../../../../../libs/shared/models';
import WebComponent from '@edudoor/ui/src/components/WebComponent';
import './ChooseStudentForm.scss';
import { fetchStudentsNotRegisteredAction, registerStudents } from '../../../../reducers/courses/actions';
import Table from '@edudoor/ui/src/components/Table';
import Tools from '../../../../utils/Tools';
import IfElse from '@edudoor/ui/src/components/IfElse';
import BasicForm from '../BasicForm';

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


  const createStudentList = (students: Array<Student>): Array<{ selected: boolean } & Student> => {
    return students.map(student => ({
      selected: false,
      ...student,
    }));
  };

  const state = useSelector((state: State) => state.courses.registerStudents);

  return (
    <WebComponent data={studentList.data.students} loading={studentList.fetching}>
      {(students): JSX.Element => (
        <BasicForm
          initialValues={{ students: createStudentList(students) }}
          state={state}
          form={props.form}
          showSuccessToast
          onSuccess={onSuccess}
          features={[]}
          submitAction={registerStudents}
          createData={values => [courseId, { students: values.students.filter(student => {
            return student.selected;
          }).map(student => student.id)}]}
          formClassName="choose-student-form"
        >
          {(formikProps): JSX.Element => (
            <Table
              columns={{ username: 'Username', firstName: 'First Name', lastName: 'Last Name', email: 'Email', add: 'Choose' }}
              data={formikProps.values.students}
              onRowClick={(row, index): void => {
                formikProps.setFieldValue(`students.${index}.selected`, true);
              }}
              getCell={(row, index, column): JSX.Element => {
                return (
                  <div className="choose-student-form__value">
                    <IfElse condition={column === 'add'}>
                      <SwitchInput labelPosition="right" name={`students.${index}.selected`} />
                      <span>{Tools.str(row[column as keyof typeof row])}</span>
                    </IfElse>
                  </div>
                );
              }}
            />
          )}
        </BasicForm>
      )}
    </WebComponent>
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

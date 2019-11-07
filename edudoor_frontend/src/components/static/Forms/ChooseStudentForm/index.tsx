import React, { useEffect } from 'react';
import Form from '../../../ui/Form';
import SwitchInput from '../../../ui/Input/SwitchInput';
import { UseForm } from '../../../../hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../../store';
import useAction from '../../../../hooks/useActions';
import { Student } from '../../../../services/models';
import WebComponent from '../../../ui/WebComponent';
import './ChooseStudentForm.scss';
import { fetchStudentsNotRegisteredAction } from '../../../../reducers/courses/actions';
import Table from '../../../ui/Table';
import TableHeader from '../../../ui/Table/TableHeader';
import TableBody from '../../../ui/Table/TableBody';
import Tools from '../../../../utils/Tools';
import IfElse from '../../../ui/IfElse';

const ChooseStudentForm: React.FunctionComponent<ChooseStudentFormProps> = props => {
  const studentList = useSelector((state: State) => state.courses.notRegistered);
  const fetchStudents = useAction(fetchStudentsNotRegisteredAction);
  const { courseId } = props;

  useEffect(() => {
    fetchStudents(courseId);
  }, []);

  const onSubmit = () => {};

  const createStudentList = (students: Array<Student>): Array<{ selected: boolean } & Student> => {
    return students.map(student => ({
      selected: false,
      ...student,
    }));
  };

  return (
    <WebComponent data={studentList.data.students} loading={studentList.fetching}>
      {students => (
        <Form
          initialValues={{ students: createStudentList(students) }}
          onSubmit={onSubmit}
          form={props.form}
          formClassName="choose-student-form"
        >
          {(formikProps): JSX.Element => (
            <Table>
              <TableHeader
                columns={{ firstName: 'First Name', lastName: 'Last Name', email: 'Email', add: 'Choose' }}
              />
              <TableBody
                data={formikProps.values.students}
                onRowClick={(row, index) => {
                  formikProps.setFieldValue(`students.${index}.selected`, true);
                }}
                getCell={(row, index, column) => {
                  return (
                    <div className="choose-student-form__value">
                      <IfElse condition={column === 'add'}>
                        <SwitchInput labelPosition="right" name={`students.${index}.selected`} />
                        <span>{Tools.str(row[column as keyof Student])}</span>
                      </IfElse>
                    </div>
                  );
                }}
              />
            </Table>
          )}
        </Form>
      )}
    </WebComponent>
  );
};

export interface ChooseStudentFormState {
  students: Array<{ selected: boolean } & Student>;
}

export interface ChooseStudentFormProps {
  form: UseForm<ChooseStudentFormState>;
  courseId: number;
}

export default ChooseStudentForm;

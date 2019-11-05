import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import AddStudentForm, { AddStudentFormState } from '../../components/static/Forms/AddStudentForm';
import useForm from '../../hooks/useForm';
import useAction from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect } from 'react-router';
import useFormSubmit from '../../hooks/useFormSubmit';
import IfElse from '../../components/ui/IfElse';
import { addStudentAction } from '../../reducers/students/actions';

const AddStudent: React.FunctionComponent<AddStudentProps> = props => {
  const studentForm = useForm<AddStudentFormState>();
  const createStudent = useAction(addStudentAction);
  const routes = useRoutes();
  const newStudent = useSelector((state: State) => state.students.newStudent);
  const submitted = useFormSubmit(newStudent);

  const onSubmit = (values: AddStudentFormState): void => {
    createStudent(values);
  };

  return (
    <IfElse condition={submitted}>
      <Redirect to={routes.routes.studentList.link} />
      <Layout
        noNavBar
        {...props}
        header="Add Student"
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddStudentForm useForm={studentForm} onSubmit={onSubmit} state={newStudent} />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddStudent;

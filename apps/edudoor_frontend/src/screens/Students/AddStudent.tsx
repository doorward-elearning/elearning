import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../../../../libs/ui/types';
import AddStudentForm, { AddStudentFormState } from '../../components/Forms/AddStudentForm';
import useForm from '../../../../../libs/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../../../../libs/ui/hooks/useRoutes';
import { Redirect } from 'react-router';
import useFormSubmit from '../../../../../libs/ui/hooks/useFormSubmit';
import IfElse from '../../../../../libs/ui/components/IfElse';

const AddStudent: React.FunctionComponent<AddStudentProps> = props => {
  const studentForm = useForm<AddStudentFormState>();
  const routes = useRoutes();
  const newStudent = useSelector((state: State) => state.students.newStudent);
  const submitted = useFormSubmit(newStudent);

  return (
    <IfElse condition={submitted}>
      <Redirect to={routes.routes.studentList.link} />
      <Layout
        {...props}
        header="Add Student"
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddStudentForm
          onCancel={() => routes.navigate(routes.routes.studentList)}
          useForm={studentForm}
          state={newStudent}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddStudent;

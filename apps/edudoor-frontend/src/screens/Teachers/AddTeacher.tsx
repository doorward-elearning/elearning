import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import useForm from '../../hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect } from 'react-router';
import useFormSubmit from '../../hooks/useFormSubmit';
import IfElse from '../../components/ui/IfElse';
import AddTeacherForm from '../../components/static/Forms/AddTeacherForm';

const AddTeacher: React.FunctionComponent<AddStudentProps> = props => {
  const teacherForm = useForm();
  const routes = useRoutes();
  const newTeacher = useSelector((state: State) => state.teachers.createTeacher);
  const submitted = useFormSubmit(newTeacher);

  return (
    <IfElse condition={submitted}>
      <Redirect to={routes.routes.teacherList.link} />
      <Layout
        {...props}
        header="Add Teacher"
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddTeacherForm
          onCancel={() => routes.navigate(routes.routes.teacherList)}
          useForm={teacherForm}
          state={newTeacher}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddTeacher;

import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect } from 'react-router';
import AddTeacherForm from '../../components/Forms/AddTeacherForm';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';

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
        header={routes.addTeacher.name}
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

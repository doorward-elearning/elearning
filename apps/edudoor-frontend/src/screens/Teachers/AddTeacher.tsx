import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect } from 'react-router';
import AddTeacherForm from '../../components/Forms/AddTeacherForm';
import IfElse from '@edudoor/ui/components/IfElse';
import useFormSubmit from '@edudoor/ui/hooks/useFormSubmit';
import useForm from '@edudoor/ui/hooks/useForm';
import { PageComponent } from '@edudoor/ui/types';

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
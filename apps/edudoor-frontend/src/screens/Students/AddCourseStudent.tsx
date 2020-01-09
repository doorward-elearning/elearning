import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddStudentForm from '../../components/Forms/AddStudentForm';
import useViewCourse from '../../hooks/useViewCourse';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect, useHistory } from 'react-router';
import IfElse from '@edudoor/ui/components/IfElse';
import useFormSubmit from '@edudoor/ui/hooks/useFormSubmit';
import useForm from '@edudoor/ui/hooks/useForm';
import { PageComponent } from '@edudoor/ui/types';
import { addCourseStudentAction } from '../../reducers/courses/actions';

const AddCourseStudent: React.FunctionComponent<AddStudentProps> = props => {
  const studentForm = useForm();
  const [courseId] = useViewCourse();
  const routes = useRoutes();
  const history = useHistory();
  const createStudent = useSelector((state: State) => state.courses.createStudent);
  const submitted = useFormSubmit(createStudent);

  return (
    <IfElse condition={submitted && createStudent.fetched}>
      <Redirect to={routes.routes.courseStudents.link} />
      <Layout
        noNavBar
        {...props}
        header="Add Student"
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddStudentForm
          onCancel={(): void => history.push(routes.routes.courseStudents.link)}
          useForm={studentForm}
          action={addCourseStudentAction}
          state={createStudent}
          createData={data => [courseId, data]}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddCourseStudent;

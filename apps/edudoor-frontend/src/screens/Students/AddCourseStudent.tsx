import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import AddStudentForm, { AddStudentFormState } from '../../components/static/Forms/AddStudentForm';
import useForm from '../../hooks/useForm';
import useViewCourse from '../../hooks/useViewCourse';
import useAction from '../../hooks/useActions';
import { addCourseStudentAction } from '../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect, useHistory } from 'react-router';
import useFormSubmit from '../../hooks/useFormSubmit';
import IfElse from '../../components/ui/IfElse';

const AddCourseStudent: React.FunctionComponent<AddStudentProps> = props => {
  const studentForm = useForm();
  const [courseId] = useViewCourse();
  const routes = useRoutes();
  const history = useHistory();
  const createCourse = useSelector((state: State) => state.courses.createStudent);
  const submitted = useFormSubmit(createCourse);

  return (
    <IfElse condition={submitted}>
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
          state={createCourse}
          createData={data => [courseId, data]}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddCourseStudent;

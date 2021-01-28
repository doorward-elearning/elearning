import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddStudentForm from '../../components/Forms/AddStudentForm';
import useViewCourse from '../../hooks/useViewCourse';
import useRoutes from '../../hooks/useRoutes';
import { Redirect, useHistory } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const AddCourseStudent: React.FunctionComponent<AddStudentProps> = (props) => {
  const studentForm = useForm();
  const [courseId] = useViewCourse();
  const routes = useRoutes();
  const history = useHistory();
  const [createStudent, createStudentState] = useApiAction(DoorwardApi, (api) => api.students.createStudentInCourse);
  const submitted = useFormSubmit(createStudentState);

  return (
    <IfElse condition={submitted && createStudentState.fetched}>
      <Redirect to={routes.routes.courseStudents.link} />
      <Layout
        noNavBar
        {...props}
        header={translate('addStudent')}
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddStudentForm
          onCancel={(): void => history.push(routes.routes.courseStudents.link)}
          useForm={studentForm}
          action={createStudent}
          state={createStudentState}
          createData={(data) => [courseId, data]}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddCourseStudent;

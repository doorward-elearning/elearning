import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddStudentForm from '../../components/Forms/AddStudentForm';
import { Redirect, useRouteMatch } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import useCourse from '../../hooks/useCourse';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';
import Tools from '@doorward/common/utils/Tools';

const AddCourseStudent: React.FunctionComponent<AddStudentProps> = (props) => {
  const studentForm = useForm();
  const navigation = useNavigation();
  const [createStudent, createStudentState] = useApiAction(DoorwardApi, (api) => api.students.createStudentInCourse);
  const submitted = useFormSubmit(createStudentState);
  const {
    params: { courseId },
  } = useRouteMatch();
  useCourse(courseId);

  return (
    <IfElse condition={submitted && createStudentState.fetched}>
      <Redirect to={Tools.createRoute(ROUTES.courses.students.list, { courseId })} />
      <Layout
        {...props}
        header={translate('addStudent')}
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddStudentForm
          onCancel={(): void => navigation.navigate(ROUTES.courses.students.list, { courseId })}
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

import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddStudentForm from '../../components/Forms/AddStudentForm';
import { Redirect, useHistory, useRouteMatch } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import useCourse from '../../hooks/useCourse';

const AddCourseStudent: React.FunctionComponent<AddStudentProps> = (props) => {
  const studentForm = useForm();
  const history = useHistory();
  const [createStudent, createStudentState] = useApiAction(DoorwardApi, (api) => api.students.createStudentInCourse);
  const submitted = useFormSubmit(createStudentState);
  const {
    params: { courseId },
  } = useRouteMatch();
  const course = useCourse(courseId);

  return (
    <IfElse condition={submitted && createStudentState.fetched}>
      <Redirect to={`/courses/${courseId}/students`} />
      <Layout
        {...props}
        header={translate('addStudent')}
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddStudentForm
          onCancel={(): void => history.push(`/courses/${courseId}/students`)}
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

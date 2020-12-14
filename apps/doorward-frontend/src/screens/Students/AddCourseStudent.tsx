import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddStudentForm from '../../components/Forms/AddStudentForm';
import useViewCourse from '../../hooks/useViewCourse';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect, useHistory } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';

const AddCourseStudent: React.FunctionComponent<AddStudentProps> = (props) => {
  const studentForm = useForm();
  const [courseId] = useViewCourse();
  const routes = useRoutes();
  const history = useHistory();
  const createStudent = useDoorwardApi((state) => state.students.createStudentInCourse);
  const submitted = useFormSubmit(createStudent);

  return (
    <IfElse condition={submitted && createStudent.fetched}>
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
          action={DoorwardApi.students.createStudentInCourse}
          state={createStudent}
          createData={(data) => [courseId, data]}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddCourseStudent;

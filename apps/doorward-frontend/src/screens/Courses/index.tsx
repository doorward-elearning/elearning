import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddCourse from './AddCourse';
import CourseTable from '../../components/Tables/CourseTable';
import WebComponent from '@doorward/ui/components/WebComponent';
import { ROUTES } from '../../routes/routes';
import useModal from '@doorward/ui/hooks/useModal';
import useAction from '@doorward/ui/hooks/useActions';
import { Roles } from '@doorward/common/types/roles';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';

const Courses: React.FunctionComponent<CoursesProps> = (props) => {
  const addCourseModal = useModal(props.location.pathname === ROUTES.createCourse.link);
  const fetchCourses = useAction(DoorwardApi.courses.getCourses);
  const courses = useDoorwardApi((state) => state.courses.getCourses);

  useEffect(() => {
    fetchCourses();
  }, [props.location.pathname]);

  const TITLE = 'CREATE A NEW COURSE';
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON, LayoutFeatures.BREAD_CRUMBS]}
      header="COURSES"
      actionBtnProps={{
        text: TITLE,
        onClick: (): void => props.history.push(ROUTES.createCourse.link),
        roles: [Roles.SUPER_ADMINISTRATOR, Roles.TEACHER],
      }}
    >
      <AddCourse history={props.history} useModal={addCourseModal} title={TITLE} />
      <WebComponent data={courses.data.courses} loading={courses.fetching} modelName="Courses">
        {(list): JSX.Element => {
          return <CourseTable courses={list} history={props.history} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;

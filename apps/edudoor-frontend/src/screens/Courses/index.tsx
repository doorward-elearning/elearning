import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddCourse from './AddCourse';
import { useSelector } from 'react-redux';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import CourseTable from '../../components/Tables/CourseTable';
import { State } from '../../store';
import WebComponent from '@edudoor/ui/components/WebComponent';
import { ROUTES } from '../../routes/routes';
import useModal from '@edudoor/ui/hooks/useModal';
import useAction from '@edudoor/ui/hooks/useActions';
import { Roles } from '@edudoor/ui/components/RolesManager';
import { PageComponent } from '@edudoor/ui/types';

const Courses: React.FunctionComponent<CoursesProps> = props => {
  const addCourseModal = useModal(props.location.pathname === ROUTES.createCourse.link);
  const fetchCourses = useAction(fetchCoursesAction);
  const courses = useSelector((state: State) => state.courses.courseList);

  useEffect(() => {
    fetchCourses();
  }, []);

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
      <WebComponent data={courses.data.courses} loading={courses.fetching}>
        {(list): JSX.Element => {
          return <CourseTable courses={list} history={props.history} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;

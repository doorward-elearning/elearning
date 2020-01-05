import React, { useEffect } from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import useModal from '@edudoor/ui/hooks/useModal';
import AddCourse from './AddCourse';
import ROUTES from '@edudoor/ui/routes/routes';
import { useSelector } from 'react-redux';
import WebComponent from '@edudoor/ui/components/WebComponent';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import useAction from '@edudoor/ui/hooks/useActions';
import CourseTable from '../../components/Tables/CourseTable';
import { State } from '../../store';
import { Roles } from '../../../../../libs/ui/components/RolesManager';

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
          return (
            <CourseTable courses={list} history={props.history} />
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;

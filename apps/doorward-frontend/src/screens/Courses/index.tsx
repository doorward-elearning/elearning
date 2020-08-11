import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddCourse from './AddCourse';
import { useSelector } from 'react-redux';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import CourseTable from '../../components/Tables/CourseTable';
import { State } from '../../store';
import WebComponent from '@doorward/ui/components/WebComponent';
import { ROUTES } from '../../routes/routes';
import useModal from '@doorward/ui/hooks/useModal';
import useAction from '@doorward/ui/hooks/useActions';
import { Roles } from '@doorward/ui/components/RolesManager';
import { PageComponent } from '@doorward/ui/types';

const Courses: React.FunctionComponent<CoursesProps> = props => {
  const addCourseModal = useModal(props.location.pathname === ROUTES.createCourse.link);
  const fetchCourses = useAction(fetchCoursesAction);
  const courses = useSelector((state: State) => state.courses.courseList);

  useEffect(() => {
    fetchCourses();
  }, [props.location.pathname]);

  const TITLE = 'CREATE A NEW MEETING';
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON, LayoutFeatures.BREAD_CRUMBS]}
      header="MEETINGS"
      actionBtnProps={{
        text: TITLE,
        onClick: (): void => props.history.push(ROUTES.createCourse.link),
        roles: [Roles.SUPER_ADMINISTRATOR, Roles.MODERATOR],
      }}
    >
      <AddCourse history={props.history} useModal={addCourseModal} title={TITLE} />
      <WebComponent data={courses.data.courses} loading={courses.fetching} modelName="Meetings">
        {(list): JSX.Element => {
          return <CourseTable courses={list} history={props.history} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;

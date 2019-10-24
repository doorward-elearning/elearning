import React, { useEffect } from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import useModal from '../../hooks/useModal';
import AddCourseModal from './AddCourseModal';
import ROUTES from '../../routes/routes';
import { useAction } from '../../hooks/useActions';
import { FETCH_COURSES } from '../../reducers/courses/types';
import { useSelector } from 'react-redux';
import Course from '../../components/static/Course';
import Grid from '../../components/static/Grid';
import WebComponentItems from '../../components/static/WebComponentItems';
import { State } from '../../store/store';
import { CourseResponse } from '../../services/responseBodies';

const Courses: React.FunctionComponent<CoursesProps> = props => {
  const addCourseModal = useModal(props.location.pathname === ROUTES.createCourse.link);
  const fetchCourses = useAction({ type: FETCH_COURSES });
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
        onClick: () => props.history.push(ROUTES.createCourse.link),
      }}
    >
      <AddCourseModal history={props.history} useModal={addCourseModal} title={TITLE} />
      <WebComponentItems list={courses.data} loading={courses.fetching}>
        {(list): JSX.Element => (
          <Grid columns={4}>
            {list.map((course: CourseResponse) => {
              return <Course course={course} key={course.title} />;
            })}
          </Grid>
        )}
      </WebComponentItems>
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;

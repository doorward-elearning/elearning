import React, { useEffect } from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import useModal from '../../hooks/useModal';
import AddCourse from './AddCourse';
import ROUTES from '../../routes/routes';
import { useSelector } from 'react-redux';
import WebComponent from '../../components/ui/WebComponent';
import { State } from '../../store/store';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import useAction from '../../hooks/useActions';
import CourseTable from '../../components/static/Tables/CourseTable';

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
      }}
    >
      <AddCourse history={props.history} useModal={addCourseModal} title={TITLE} />
      <WebComponent data={courses.data.courses} loading={courses.fetching}>
        {(list): JSX.Element => <CourseTable courses={list} history={props.history} />}
      </WebComponent>
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;

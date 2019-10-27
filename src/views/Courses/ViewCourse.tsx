import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import ROUTES from '../../routes/routes';
import useRoutes from '../../hooks/useRoutes';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';
import { match, Redirect } from 'react-router';
import useAction from '../../hooks/useActions';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import { CourseResponse } from '../../services/responseBodies';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const { setTitle } = useRoutes();
  const fetchCourses = useAction(fetchCoursesAction);
  useEffect(() => {
    fetchCourses();
  }, []);

  const courseId = props.match.params.courseId;

  const courses = useSelector((state: State) => state.courses.courseList);
  const [course, setCourse] = useState<CourseResponse | undefined>(undefined);

  useEffect(() => {
    setCourse((courses.data || []).find(course => course.key === +courseId));
  }, [courses]);
  const title = course ? course.title : '';

  setTitle(ROUTES.viewCourse.id, title);
  return <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]} header={title} />;
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;

import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { useEffect } from 'react';
import useAction from './useActions';
import { fetchCourseAction } from '../reducers/courses/actions';
import useRoutes from './useRoutes';
import ROUTES from '../routes/routes';
import { WebComponentState } from '../reducers/reducers';
import { CreateCourseResponse } from '../services/models/responseBody';

const useViewCourse = (): [string, WebComponentState<CreateCourseResponse>] => {
  const { setTitle, setParams } = useRoutes();
  const match: any = useRouteMatch<{ courseId: string }>();
  const routes = useRoutes();
  const courseId = match.params.courseId;
  const fetchCourse = useAction(fetchCourseAction);
  useEffect(() => {
    if (!/\d+/.test(courseId)) {
      routes.navigate(routes.routes.courseList);
    }
    if (courseId) {
      fetchCourse(courseId);
    }
  }, []);

  const course = useSelector((state: State) => state.courses.viewCourse);

  useEffect(() => {
    if (course.data.course) {
      const courseData = course.data.course;
      setParams(ROUTES.viewCourse.id, { courseId: courseData.id, ...match.params });
      setTitle(ROUTES.viewCourse.id, courseData.title, ROUTES.viewCourse.link);
    }
  }, [course]);

  return [courseId, course];
};

export default useViewCourse;

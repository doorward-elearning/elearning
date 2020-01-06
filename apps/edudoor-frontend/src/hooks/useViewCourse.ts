import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { useEffect } from 'react';
import { fetchCourseAction } from '../reducers/courses/actions';
import useRoutes from './useRoutes';
import { CreateCourseResponse } from '../services/models/responseBody';
import { ROUTES } from '../routes/routes';
import { WebComponentState } from '@edudoor/ui/reducers/reducers';
import useAction from '@edudoor/ui/hooks/useActions';

const useViewCourse = (): [string, WebComponentState<CreateCourseResponse>] => {
  const { setTitle, setParams } = useRoutes();
  const match: any = useRouteMatch<{ courseId: string }>();
  const courseId = match.params.courseId;
  const fetchCourse = useAction(fetchCourseAction);
  useEffect(() => {
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
import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { useEffect } from 'react';
import useRoutes from './useRoutes';
import { ROUTES } from '../routes/routes';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';
import { CourseResponse } from '@doorward/common/dtos/response';
import DoorwardApi from '../services/apis/doorward.api';
import useDoorwardApi from './useDoorwardApi';

const useViewCourse = (): [string, WebComponentState<CourseResponse>] => {
  const { setTitle, setParams } = useRoutes();
  const match: any = useRouteMatch<{ courseId: string }>();
  const courseId = match.params.courseId;
  const fetchCourse = useAction(DoorwardApi.courses.getCourse);
  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
    }
  }, []);

  const course = useDoorwardApi((state) => state.courses.getCourse);

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

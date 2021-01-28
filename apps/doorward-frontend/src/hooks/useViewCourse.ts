import { useRouteMatch } from 'react-router';
import { useEffect } from 'react';
import useRoutes from './useRoutes';
import { ROUTES } from '../routes/routes';
import { CourseResponse } from '@doorward/common/dtos/response';
import DoorwardApi from '../services/apis/doorward.api';
import { useApiAction } from 'use-api-action';
import { WebComponentState } from 'use-api-action/types/types';

const useViewCourse = (): [string, WebComponentState<CourseResponse, CourseResponse>] => {
  const { setTitle, setParams } = useRoutes();
  const match: any = useRouteMatch<{ courseId: string }>();
  const courseId = match.params.courseId;

  const [fetchCourse, course] = useApiAction(DoorwardApi, (api) => api.courses.getCourse);

  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
    }
  }, []);

  useEffect(() => {
    if (course.data?.course) {
      const courseData = course.data?.course;
      setParams(ROUTES.viewCourse.id, { courseId: courseData.id, ...match.params });
      setTitle(ROUTES.viewCourse.id, courseData.title, ROUTES.viewCourse.link);
    }
  }, [course]);

  return [courseId, course];
};

export default useViewCourse;

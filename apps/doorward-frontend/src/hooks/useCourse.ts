import { useEffect } from 'react';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../services/apis/doorward.api';

const useCourse = (courseId: string) => {
  const [getCourse, courseState] = useApiAction(DoorwardApi, (api) => api.courses.getCourse, {});

  useEffect(() => {
    if (courseId) {
      getCourse(courseId);
    }
  }, [courseId]);

  return courseState;
};

export default useCourse;

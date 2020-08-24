import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import CourseEntity from '@doorward/common/entities/course.entity';

export default interface CourseResponse extends ApiResponse {
  course: CourseEntity;
}

export interface CoursesResponse extends ApiResponse {
  courses: CourseEntity[];
}

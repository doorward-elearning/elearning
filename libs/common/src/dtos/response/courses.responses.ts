import { Expose } from 'class-transformer';
import CourseModel from '@doorward/common/models/course.model';
import DApiResponse, { PaginatedResponse } from '@doorward/common/dtos/response/base.response';

export class CourseResponse extends DApiResponse {
  @Expose()
  course: CourseModel;
}

export class DeleteCourseResponse extends DApiResponse {
  @Expose()
  id: string;
}

export class CoursesResponse extends PaginatedResponse {
  @Expose()
  courses: CourseModel[];
}

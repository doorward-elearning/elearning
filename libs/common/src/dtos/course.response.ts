import CourseEntity from '@doorward/common/entities/course.entity';
import DApiResponse from '@doorward/common/dtos/d.api.response';

export default class CourseResponse extends DApiResponse {
  course: CourseEntity;
}

export class CoursesResponse extends DApiResponse {
  courses: CourseEntity[];
}

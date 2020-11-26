import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import CourseEntity from '@doorward/common/entities/course.entity';
import DApiResponse, { PaginatedResponse } from '@doorward/common/dtos/response/base.response';

export class CourseResponse extends DApiResponse {
  @Expose()
  course: CourseEntity;
}

export class DeleteCourseResponse extends DApiResponse {
  @Expose()
  id: string;
}

export class CoursesResponse extends PaginatedResponse {
  @Expose()
  courses: CourseEntity[];
}

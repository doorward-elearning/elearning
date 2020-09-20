import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import CourseEntity from '@doorward/common/entities/course.entity';
import DApiResponse from '@doorward/common/dtos/response/index';

export class CourseResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  course: CourseEntity;
}

export class DeleteCourseResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  id: string;
}

export class CoursesResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  courses: CourseEntity[];
}

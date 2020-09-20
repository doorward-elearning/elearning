import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import CourseManagerEntity from '@doorward/common/entities/course.manager.entity';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class CourseManagersResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  courseManagers: CourseManagerEntity[];
}

export class CourseManagerResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  courseManager: CourseManagerEntity;
}

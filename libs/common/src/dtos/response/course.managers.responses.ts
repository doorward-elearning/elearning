import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import CourseManagerEntity from '@doorward/common/entities/course.manager.entity';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import UserEntity from '@doorward/common/entities/user.entity';

export class CourseManagerModel extends UserEntity {
  @Expose()
  courseId: string;

  @Expose()
  creatorId: string;

  @Expose()
  creatorFullName: string;

  constructor(courseManager: CourseManagerEntity) {
    super();
    Object.assign(this, courseManager.manager);
    this.creatorId = courseManager.creator?.id;
    this.creatorFullName = courseManager.creator?.fullName;
  }
}

export class CourseManagersResponse extends DApiResponse {
  @Expose()
  courseManagers: CourseManagerEntity[];
}

export class CourseManagerResponse extends DApiResponse {
  @Expose()
  courseManager: CourseManagerEntity;
}

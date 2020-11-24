import { Expose } from 'class-transformer';
import CourseManagerModel from '@doorward/common/models/course.manager.model';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import UserModel from '@doorward/common/models/user.model';

export class CourseManagerModel extends UserModel {
  @Expose()
  courseId: string;

  @Expose()
  creatorId: string;

  @Expose()
  creatorFullName: string;

  constructor(courseManager: CourseManagerModel) {
    super();
    Object.assign(this, courseManager.manager);
    this.creatorId = courseManager.creator?.id;
    this.creatorFullName = courseManager.creator?.fullName;
  }
}

export class CourseManagersResponse extends DApiResponse {
  @Expose()
  courseManagers: CourseManagerModel[];
}

export class CourseManagerResponse extends DApiResponse {
  @Expose()
  courseManager: CourseManagerModel;
}

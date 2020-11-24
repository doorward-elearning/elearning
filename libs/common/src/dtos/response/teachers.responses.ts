import DApiResponse from '@doorward/common/dtos/response/base.response';
import { Expose } from 'class-transformer';
import UserModel from '@doorward/common/models/user.model';

export class TeacherResponse extends DApiResponse {
  @Expose()
  teacher: UserModel;
}

export class TeachersResponse extends DApiResponse {
  @Expose()
  teachers: UserModel[];
}

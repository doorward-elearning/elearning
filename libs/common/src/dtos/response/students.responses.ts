import { Expose } from 'class-transformer';
import UserModel from '@doorward/common/models/user.model';
import DApiResponse, { PaginatedResponse } from '@doorward/common/dtos/response/base.response';

export class StudentResponse extends DApiResponse {
  @Expose()
  student: UserModel;
}

export class StudentsResponse extends PaginatedResponse {
  @Expose()
  students: Array<UserModel>;
}

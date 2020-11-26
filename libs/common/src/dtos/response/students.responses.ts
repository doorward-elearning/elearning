import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import UserEntity from '@doorward/common/entities/user.entity';
import DApiResponse, { PaginatedResponse } from '@doorward/common/dtos/response/base.response';

export class StudentResponse extends DApiResponse {
  @Expose()
  student: UserEntity;
}

export class StudentsResponse extends PaginatedResponse {
  @Expose()
  students: Array<UserEntity>;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import UserEntity from '@doorward/common/entities/user.entity';
import DApiResponse from '@doorward/common/dtos/response/index';

export class StudentResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  student: UserEntity;
}

export class StudentsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  students: Array<UserEntity>;
}

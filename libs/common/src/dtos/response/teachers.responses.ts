import DApiResponse from '@doorward/common/dtos/response/base.response';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import UserEntity from '@doorward/common/entities/user.entity';

export class TeacherResponse extends DApiResponse {
  @Expose()
  teacher: UserEntity;
}

export class TeachersResponse extends DApiResponse {
  @Expose()
  teachers: UserEntity[];
}

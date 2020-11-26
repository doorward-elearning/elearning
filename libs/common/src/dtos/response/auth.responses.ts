import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import UserEntity from '@doorward/common/entities/user.entity';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class LoginResponse extends DApiResponse {
  @Expose()
  token: string;

  @Expose()
  user: UserEntity;
}

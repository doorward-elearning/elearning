import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import UserEntity from '@doorward/common/entities/user.entity';
import DApiResponse from '@doorward/common/dtos/response/index';

export class LoginResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  token: string;
  @ApiProperty()
  @Expose()
  user: UserEntity;
}

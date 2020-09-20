import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import UserEntity from '@doorward/common/entities/user.entity';
import DApiResponse from '@doorward/common/dtos/response/index';

export class UserResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  user: UserEntity;
}

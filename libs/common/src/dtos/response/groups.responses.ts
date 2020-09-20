import GroupEntity from '@doorward/common/entities/group.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class GroupResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  group: GroupEntity;
}

export class GroupsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  groups: GroupEntity[];
}

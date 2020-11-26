import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import { GroupRoles } from '@doorward/common/types/groups';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import GroupEntity from '@doorward/common/entities/group.entity';
import UserEntity from '@doorward/common/entities/user.entity';

export class GroupMemberResponse extends UserEntity {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  groupRole: GroupRoles;

  @ApiProperty()
  @Expose()
  referredBy: string;

  @ApiProperty()
  @Expose()
  joinedOn: Date;

  constructor(groupMember: GroupMemberEntity) {
    super();
    Object.assign(this, groupMember.member);
    this.groupRole = groupMember.role;
  }
}

export class SimpleGroupResponse {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  members: Array<GroupMemberResponse>;

  constructor(group: GroupEntity) {
    this.id = group.id;
    this.name = group.name;
    this.type = group.type;
    this.members = group.members?.map((member) => new GroupMemberResponse(member));
  }
}

export class GroupResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  group: SimpleGroupResponse;
}

export class GroupsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  groups: SimpleGroupResponse[];
}

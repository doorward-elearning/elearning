import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import { GroupRoles } from '@doorward/common/types/groups';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import GroupEntity from '@doorward/common/entities/group.entity';

export class GroupMemberResponse {
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
  id: string;

  @ApiProperty()
  @Expose()
  role: GroupRoles;

  @ApiProperty()
  @Expose()
  referredBy: string;

  @ApiProperty()
  @Expose()
  joinedOn: Date;

  constructor(groupMember: GroupMemberEntity) {
    const { member, referee, role } = groupMember;
    this.firstName = member?.firstName;
    this.lastName = member?.lastName;
    this.email = member?.email;
    this.id = member?.id;
    this.role = role;
    this.referredBy = referee?.id;
    this.joinedOn = groupMember.createdAt;
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
  members: Array<GroupMemberResponse>;

  constructor(group: GroupEntity) {
    this.id = group.id;
    this.name = group.name;
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

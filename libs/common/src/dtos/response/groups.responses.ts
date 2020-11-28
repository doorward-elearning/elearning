import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import { GroupRoles } from '@doorward/common/types/groups';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import GroupEntity from '@doorward/common/entities/group.entity';
import UserEntity from '@doorward/common/entities/user.entity';

export class GroupMemberResponse extends UserEntity {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  groupRole: GroupRoles;

  @Expose()
  referredBy: string;

  @Expose()
  joinedOn: Date;

  constructor(groupMember: GroupMemberEntity) {
    super();
    Object.assign(this, groupMember.member);
    this.groupRole = groupMember.role;
  }
}

export class SimpleGroupResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;

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
  @Expose()
  group: SimpleGroupResponse;
}

export class GroupsResponse extends DApiResponse {
  @Expose()
  groups: SimpleGroupResponse[];
}

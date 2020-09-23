import { Injectable } from '@nestjs/common';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import { GroupMemberResponse } from '@doorward/common/dtos/response';

@Injectable()
export default class GroupsUtils {
  /**
   *
   * @param members
   */
  public async groupMembersToResponse(members: Array<GroupMemberEntity>): Promise<Array<GroupMemberResponse>> {
    return members.map((member) => new GroupMemberResponse(member));
  }
}

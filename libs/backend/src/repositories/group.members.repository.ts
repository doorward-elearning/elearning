import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import { GroupRoles } from '@doorward/common/types/groups';

export default class GroupMembersRepository extends MultiOrganizationRepository<GroupMemberEntity> {
  /**
   *
   * @param memberId
   * @param groupId
   */
  public async memberExistsInGroup(memberId: string, groupId: string) {
    return this.findOne({
      where: {
        member: { id: memberId },
        group: { id: groupId },
      },
    });
  }

  /**
   *
   * @param memberId
   * @param groupId
   * @param refereeId
   * @param role
   */
  public async addMemberToGroup(
    memberId: string,
    groupId: string,
    refereeId: string,
    role: GroupRoles = GroupRoles.MEMBER
  ) {
    let groupMember = await this.memberExistsInGroup(memberId, groupId);

    if (!groupMember) {
      groupMember = await this.save(
        this.create({
          group: { id: groupId },
          member: { id: memberId },
          referee: { id: refereeId },
          role,
        }),
        {
          transaction: false,
        }
      );
    }
    return this.findOne(groupMember.id, { relations: ['member'] });
  }

  getEntity(): ObjectType<GroupMemberEntity> {
    return GroupMemberEntity;
  }
}

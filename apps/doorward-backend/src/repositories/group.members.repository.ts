import OrganizationBasedRepository from '../utils/organization.based.repository';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import { EntityRepository } from 'typeorm';
import { GroupRoles } from '@doorward/common/types/groups';

@EntityRepository(GroupMemberEntity)
export default class GroupMembersRepository extends OrganizationBasedRepository<GroupMemberEntity> {
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
        })
      );
    }
    return this.findOne(groupMember.id, { relations: ['member'] });
  }
}

import { Injectable } from '@nestjs/common';
import GroupsRepository from '@repositories/groups.repository';
import { UsersRepository } from '@repositories/users.repository';
import GroupMembersRepository from '@repositories/group.members.repository';
import UserEntity from '@doorward/common/entities/user.entity';
import { GroupRoles } from '@doorward/common/types/groups';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import GroupEntity from '@doorward/common/entities/group.entity';
import { CreateGroupBody } from '@doorward/common/dtos/body/groups.body';
import GroupsUtils from './groups.utils';

@Injectable()
export class GroupsService {
  constructor(
    private groupsRepository: GroupsRepository,
    private userRepository: UsersRepository,
    private groupMemberRepository: GroupMembersRepository,
    private groupsUtils: GroupsUtils
  ) {}

  /**
   *
   * @param body
   * @param creator
   */
  public async createGroup(body: CreateGroupBody, creator: UserEntity): Promise<GroupEntity> {
    const group = await this.groupsRepository.save(
      this.groupsRepository.create({
        name: body.name,
        type: body.type,
        author: creator,
      })
    );

    // add members to the group
    group.members = await this.addMembersToGroup(group.id, body.members, creator.id);

    return group;
  }

  /**
   *
   * @param groupId
   * @param members
   * @param refereeId
   */
  public async addMembersToGroup(
    groupId: string,
    members: Array<string>,
    refereeId: string
  ): Promise<GroupMemberEntity[]> {
    return Promise.all(members.map(async (member) => this.addMemberToGroup(member, groupId, refereeId)));
  }

  /**
   *
   * @param memberId
   * @param groupId
   * @param refereeId
   * @param role
   */
  public async addMemberToGroup(memberId: string, groupId: string, refereeId: string, role?: GroupRoles) {
    return this.groupMemberRepository.addMemberToGroup(memberId, groupId, refereeId, role);
  }
}

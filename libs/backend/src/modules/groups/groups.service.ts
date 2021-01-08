import { Injectable } from '@nestjs/common';
import GroupsRepository from '@doorward/backend/repositories/groups.repository';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import GroupMembersRepository from '@doorward/backend/repositories/group.members.repository';
import UserEntity from '@doorward/common/entities/user.entity';
import { GroupRoles } from '@doorward/common/types/groups';
import GroupMemberEntity from '@doorward/common/entities/group.member.entity';
import GroupEntity from '@doorward/common/entities/group.entity';
import { CreateGroupBody } from '@doorward/common/dtos/body/groups.body';
import GroupsUtils from './groups.utils';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import compareLists from '@doorward/common/utils/compareLists';
import { Brackets } from 'typeorm';
import translate from '@doorward/common/lang/translate';

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
   * @param type
   * @param search
   */
  public async getGroups(type?: string, search?: string) {
    const queryBuilder = this.groupsRepository.createSearchQueryBuilder('group', ['name'], search);

    if (type) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('group.type = :type', { type });
        })
      );
    }

    queryBuilder.leftJoinAndSelect('group.members', 'members').leftJoinAndSelect('members.member', 'member');
    return queryBuilder.getMany();
  }

  /**
   *
   * @param userId
   */
  public async getGroupsWithUser(userId: string) {
    return this.groupsRepository.getGroupsWithUser(userId);
  }

  /**
   *
   * @param body
   * @param creator
   * @param uniqueName
   */
  public async createGroup(body: CreateGroupBody, creator: UserEntity, uniqueName = true): Promise<GroupEntity> {
    if ((await this.groupsRepository.checkGroupExists(body.name)) && uniqueName) {
      throw new ValidationException({ name: translate('groupWithThisNameAlreadyExists') });
    }

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

  public async getGroup(id: string) {
    return this.groupsRepository.findOne(id, { relations: ['members', 'members.member'] });
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

  /**
   *
   * @param memberId
   * @param groupId
   */
  public async removeMemberFromGroup(memberId: string, groupId: string) {
    await this.groupMemberRepository.delete({
      member: { id: memberId },
      group: { id: groupId },
    });
  }

  /**
   *
   * @param groupId
   * @param members
   */
  public async removeMembersFromGroup(groupId: string, members: Array<string>) {
    await Promise.all(members.map(async (memberId) => this.removeMemberFromGroup(memberId, groupId)));
  }

  /**
   *
   * @param groupId
   * @param body
   * @param referee
   */
  public async updateGroup(groupId: string, body: CreateGroupBody, referee: UserEntity): Promise<GroupEntity> {
    if (await this.groupsRepository.checkGroupExists(body.name, groupId)) {
      throw new ValidationException({ name: translate('groupWithThisNameAlreadyExists') });
    }
    const existingGroup = await this.getGroup(groupId);

    const { name, type } = body;

    await this.groupsRepository.update(groupId, { name, type });

    const { newItems, removed } = compareLists(
      existingGroup.members,
      body.members,
      (existingItem, newItem) => existingItem.member.id === newItem
    );

    await this.removeMembersFromGroup(
      groupId,
      removed.map((removed) => removed.member.id)
    );

    await this.addMembersToGroup(groupId, newItems, referee.id);

    return this.getGroup(groupId);
  }
}

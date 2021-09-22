import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import GroupEntity from '@doorward/common/entities/group.entity';

export default class GroupsRepository extends MultiOrganizationRepository<GroupEntity> {
  /**
   *
   * @param groupName
   * @param exception
   */
  public async checkGroupExists(groupName: string, exception?: string) {
    let queryBuilder = this.createQueryBuilder('group').where('LOWER(group.name) = LOWER(:group)', {
      group: groupName,
    });
    if (exception) {
      queryBuilder = queryBuilder.andWhere('group.id != :exception', { exception });
    }

    return queryBuilder.getOne();
  }

  /**
   *
   * @param type
   */
  public async getGroupsByType(type?: string) {
    const queryBuilder = this.createQueryBuilder('group');
    if (type) {
      queryBuilder.where('type = :type', { type });
    }
    return queryBuilder.getMany();
  }

  public async getGroupsWithUser(userId: string, includeChat?: boolean) {
    const queryBuilder = this.createQueryBuilder('group');

    queryBuilder.leftJoin('group.members', 'member').where('member."userId" = :userId', { userId });

    if (!includeChat) {
      queryBuilder.andWhere('type != :type', { type: 'DirectMessage' });
    }

    queryBuilder.leftJoinAndSelect('group.members', 'groupMember');

    return queryBuilder.getMany();
  }

  getEntity(): ObjectType<GroupEntity> {
    return GroupEntity;
  }
}

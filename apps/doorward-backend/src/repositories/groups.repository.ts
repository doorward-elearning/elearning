import OrganizationBasedRepository from '../utils/organization.based.repository';
import GroupEntity from '@doorward/common/entities/group.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(GroupEntity)
export default class GroupsRepository extends OrganizationBasedRepository<GroupEntity> {
  public async checkGroupExists(groupName: string, exception?: string) {
    let queryBuilder = this.createQueryBuilder('group').where('LOWER(group.name) = LOWER(:group)', {
      group: groupName,
    });
    if (exception) {
      queryBuilder = queryBuilder.andWhere('group.id != :exception', { exception });
    }

    return queryBuilder.getOne();
  }
}

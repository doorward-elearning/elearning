import OrganizationBasedRepository from '../utils/organization.based.repository';
import GroupEntity from '@doorward/common/entities/group.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(GroupEntity)
export default class GroupsRepository extends OrganizationBasedRepository<GroupEntity> {}

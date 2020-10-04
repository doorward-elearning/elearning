import { EntityRepository } from 'typeorm';
import OrganizationBasedRepository from '@doorward/backend/repositories/organization.based.repository';
import DiscussionGroupEntity from '@doorward/common/entities/discussion.group.entity';

@EntityRepository(DiscussionGroupEntity)
export default class DiscussionGroupRepository extends OrganizationBasedRepository<DiscussionGroupEntity> {}

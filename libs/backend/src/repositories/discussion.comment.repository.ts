import { EntityRepository } from 'typeorm';
import DiscussionCommentEntity from '@doorward/common/entities/discussion.comment.entity';
import OrganizationBasedRepository from '@doorward/backend/repositories/organization.based.repository';

@EntityRepository(DiscussionCommentEntity)
export default class DiscussionCommentRepository extends OrganizationBasedRepository<DiscussionCommentEntity> {}

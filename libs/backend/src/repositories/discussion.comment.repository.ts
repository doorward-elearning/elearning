import DiscussionCommentEntity from '@doorward/common/entities/discussion.comment.entity';
import MultiOrganizationRepository from '@doorward/backend/repositories/multi.organization.repository';
import { ObjectType } from 'typeorm';

export default class DiscussionCommentRepository extends MultiOrganizationRepository<DiscussionCommentEntity> {
  getEntity(): ObjectType<DiscussionCommentEntity> {
    return DiscussionCommentEntity;
  }
}

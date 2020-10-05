import { EntityRepository } from 'typeorm';
import OrganizationBasedRepository from '@doorward/backend/repositories/organization.based.repository';
import DiscussionGroupEntity from '@doorward/common/entities/discussion.group.entity';
import DiscussionCommentEntity from '@doorward/common/entities/discussion.comment.entity';

@EntityRepository(DiscussionGroupEntity)
export default class DiscussionGroupRepository extends OrganizationBasedRepository<DiscussionGroupEntity> {
  /**
   *
   * @param title
   * @param courseId
   * @param excludeIds
   */
  async findByTitle(title: string, courseId: string, excludeIds?: Array<string>) {
    const queryBuilder = this.createQueryBuilder('discussionGroup')
      .where('LOWER(:title) = LOWER(title)', {
        title: title.trim(),
      })
      .where('"discussionGroup"."courseId" = :courseId', { courseId });

    if (excludeIds) {
      queryBuilder.andWhere('id NOT IN (:...excludeIds)', { excludeIds });
    }

    return queryBuilder.getOne();
  }

  async getById(id: string) {
    const queryBuilder = this.createQueryBuilder('discussionGroup')
      .where('"discussionGroup".id = :id', { id })
      .leftJoinAndSelect('discussionGroup.comments', 'comment')
      .leftJoinAndSelect('comment.author', 'commentAuthor')
      .leftJoinAndSelect('discussionGroup.creator', 'creator');

    return queryBuilder.getOne();
  }
}

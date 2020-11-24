import { Column, Entity, ManyToOne } from 'typeorm';
import BaseOrganizationEntity from '@doorward/common/entities/base.organization.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import DiscussionGroupEntity from '@doorward/common/entities/discussion.group.entity';
import DiscussionCommentModel  from '@doorward/common/models/discussion.comment.model';

@Entity('DiscussionGroupComments')
export default class DiscussionCommentEntity extends BaseOrganizationEntity implements DiscussionCommentModel {
  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @ManyToOne(() => DiscussionGroupEntity, (discussionGroup) => discussionGroup.comments)
  discussionGroup: DiscussionGroupEntity;
}

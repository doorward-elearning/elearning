import { Column, Entity, ManyToOne } from 'typeorm';
import UserEntity from '@doorward/common/entities/user.entity';
import DiscussionGroupEntity from '@doorward/common/entities/discussion.group.entity';
import BaseEntity from '@doorward/common/entities/base.entity';

@Entity('DiscussionGroupComments')
export default class DiscussionCommentEntity extends BaseEntity {
  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @ManyToOne(() => DiscussionGroupEntity, (discussionGroup) => discussionGroup.comments)
  discussionGroup: DiscussionGroupEntity;
}

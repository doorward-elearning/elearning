import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import CourseEntity from '@doorward/common/entities/course.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import DiscussionCommentEntity from '@doorward/common/entities/discussion.comment.entity';
import BaseEntity from '@doorward/common/entities/base.entity';

@Entity('DiscussionGroups')
export default class DiscussionGroupEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => CourseEntity, (course) => course.discussionGroups)
  course: CourseEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  creator: UserEntity;

  @OneToMany(() => DiscussionCommentEntity, (comment) => comment.discussionGroup)
  comments: DiscussionCommentEntity[];
}

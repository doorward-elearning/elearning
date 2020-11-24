import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseOrganizationEntity from '@doorward/common/entities/base.organization.entity';
import CourseEntity from '@doorward/common/entities/course.entity';
import UserEntity from '@doorward/common/entities/user.entity';
import DiscussionCommentEntity from '@doorward/common/entities/discussion.comment.entity';
import DiscussionGroupModel  from '@doorward/common/models/discussion.group.model';

@Entity('DiscussionGroups')
export default class DiscussionGroupEntity extends BaseOrganizationEntity implements DiscussionGroupModel {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => CourseEntity, (course) => course.discussionGroups)
  course: CourseEntity;

  @ManyToOne(() => UserEntity)
  creator: UserEntity;

  @OneToMany(() => DiscussionCommentEntity, (comment) => comment.discussionGroup)
  comments: DiscussionCommentEntity[];
}

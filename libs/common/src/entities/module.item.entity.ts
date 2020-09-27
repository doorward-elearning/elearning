import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, TableInheritance } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from './module.entity';
import UserEntity from './user.entity';
import QuestionEntity from './question.entity';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';

@Entity('ModuleItems')
@TableInheritance({
  column: {
    type: 'enum',
    enum: ModuleItemType,
  },
})
export default class ModuleItemEntity extends BaseOrganizationEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => ModuleEntity, (module) => module.items, {
    onDelete: 'CASCADE',
  })
  module: ModuleEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdBy' })
  author: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: Array<QuestionEntity>;

  @OneToMany(() => AssignmentSubmissionEntity, (assignment) => assignment.assignment)
  assignmentSubmissions: Array<AssignmentSubmissionEntity>;
}

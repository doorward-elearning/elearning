import BaseEntity from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleEntity from './module.entity';
import UserEntity from './user.entity';
import QuestionEntity from './question.entity';

@Entity('ModuleItems')
export default class ModuleItemEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ enum: ModuleItemType, type: 'enum' })
  type: ModuleItemType;

  @ManyToOne(() => ModuleEntity, (module) => module.items, {
    onDelete: 'CASCADE',
  })
  module: ModuleEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdBy' })
  author: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: Array<QuestionEntity>;
}

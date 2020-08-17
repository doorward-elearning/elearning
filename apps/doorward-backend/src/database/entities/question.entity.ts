import BaseEntity from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import ModuleItemEntity from './module.item.entity';

@Entity('Questions')
export default class QuestionEntity extends BaseEntity {
  @Column({ type: 'text' })
  question: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => ModuleItemEntity, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
  })
  quiz: ModuleItemEntity;
}

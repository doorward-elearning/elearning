import BaseEntity from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import ModuleItemEntity from './module.item.entity';
import AnswerEntity from './answer.entity';

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

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: Array<AnswerEntity>;
}

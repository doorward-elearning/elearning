import BaseEntity from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import QuestionEntity from './question.entity';

@Entity('Answers')
export default class AnswerEntity extends BaseEntity {
  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: false })
  correct: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: QuestionEntity;
}

import { Column, Entity, ManyToOne } from 'typeorm';
import QuestionEntity from './question.entity';
import { Expose } from 'class-transformer';
import BaseEntity from '@doorward/common/entities/base.entity';

@Entity('Answers')
export default class AnswerEntity extends BaseEntity {
  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: false })
  correct: boolean;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => QuestionEntity, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @Expose({ groups: ['answer-question'] })
  question?: QuestionEntity;
}

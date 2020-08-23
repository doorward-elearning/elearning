import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import QuestionEntity from './question.entity';

@Entity('Answers')
export default class AnswerEntity extends BaseOrganizationEntity {
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

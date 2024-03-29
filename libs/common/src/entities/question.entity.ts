import BaseEntity from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import AnswerEntity from './answer.entity';
import { AnswerTypes } from '@doorward/common/types/exam';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';

@Entity('Questions')
export default class QuestionEntity extends BaseEntity {
  @Column({ type: 'text' })
  question: string;

  @Column({ default: 0 })
  points: number;

  @Column({ type: 'enum', enum: AnswerTypes, default: AnswerTypes.MULTIPLE_CHOICE })
  type: AnswerTypes;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: Array<AnswerEntity>;

  @ManyToOne(() => QuestionSectionEntity, (section) => section.questions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  section: QuestionSectionEntity;
}

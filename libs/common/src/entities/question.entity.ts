import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import AnswerEntity from './answer.entity';
import { Expose } from 'class-transformer';
import { AnswerTypes } from '@doorward/common/types/exam';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import QuestionModel  from '@doorward/common/models/question.model';

@Entity('Questions')
export default class QuestionEntity extends BaseOrganizationEntity implements QuestionModel {
  @Column({ type: 'text' })
  question: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => AssessmentEntity, (assessment) => assessment.questions, {
    onDelete: 'CASCADE',
  })
  @Expose({ groups: ['question-assessment'] })
  assessment: AssessmentEntity;

  @Column({ type: 'enum', enum: AnswerTypes, default: AnswerTypes.MULTIPLE_CHOICE })
  type: AnswerTypes;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: Array<AnswerEntity>;
}

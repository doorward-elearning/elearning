import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import ModuleItemEntity from './module.item.entity';
import AnswerEntity from './answer.entity';
import { Expose } from 'class-transformer';
import { AnswerTypes } from '@doorward/common/types/exam';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';

@Entity('Questions')
export default class QuestionEntity extends BaseOrganizationEntity {
  @Column({ type: 'text' })
  question: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => AssessmentEntity, (assessment) => assessment.questions, {
    onDelete: 'CASCADE',
  })
  @Expose({ groups: ['question-assessment'] })
  assessment: ModuleItemEntity;

  @Column({ type: 'enum', enum: AnswerTypes, default: AnswerTypes.MULTIPLE_CHOICE })
  type: AnswerTypes;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: Array<AnswerEntity>;
}

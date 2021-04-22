import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseOrganizationEntity from '@doorward/common/entities/base.organization.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { QuestionSectionOptions } from '@doorward/common/types/assessments';

@Entity('QuestionSections')
export default class QuestionSectionEntity extends BaseOrganizationEntity {
  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  order: number;

  @Column({ type: 'json' })
  config: QuestionSectionOptions;

  @ManyToOne(() => AssessmentEntity, (assessment) => assessment.sections, {
    onDelete: 'CASCADE',
  })
  assessment: ModuleItemEntity;

  @OneToMany(() => QuestionEntity, (question) => question.section)
  questions: Array<QuestionEntity>;
}

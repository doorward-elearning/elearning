import { BeforeInsert, ChildEntity, Column, OneToMany } from 'typeorm';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import QuestionEntity from '@doorward/common/entities/question.entity';
import { AssessmentOptions } from '@doorward/common/types/assessments';
import AssessmentModel from '@doorward/common/models/assessment.model';

@ChildEntity(ModuleItemType.ASSESSMENT)
export class AssessmentEntity extends ModuleItemEntity implements AssessmentModel {
  @Column({ type: 'json', nullable: true })
  options: AssessmentOptions;

  @Column({ type: 'text' })
  instructions: string;

  @Column({ type: 'enum', enum: AssessmentTypes })
  assessmentType: AssessmentTypes;

  @OneToMany(() => QuestionEntity, (question) => question.assessment)
  questions: Array<QuestionEntity>;

  @BeforeInsert()
  updateAssessmentType() {}
}

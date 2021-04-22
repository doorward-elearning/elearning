import { BeforeInsert, ChildEntity, Column, OneToMany } from 'typeorm';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { AssessmentOptions } from '@doorward/common/types/assessments';
import QuestionSectionEntity from '@doorward/common/entities/question.section.entity';

@ChildEntity(ModuleItemType.ASSESSMENT)
export class AssessmentEntity extends ModuleItemEntity {
  @Column({ type: 'json', nullable: true })
  options: AssessmentOptions;

  @Column({ type: 'text' })
  instructions: string;

  @Column({ type: 'enum', enum: AssessmentTypes })
  assessmentType: AssessmentTypes;

  @OneToMany(() => QuestionSectionEntity, (section) => section.assessment)
  sections: Array<QuestionSectionEntity>;

  @BeforeInsert()
  updateAssessmentType() {}
}

import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ChildEntity, Column } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { QuizOptions } from '@doorward/common/types/quiz';

@ChildEntity(ModuleItemType.QUIZ)
export class QuizEntity extends ModuleItemEntity {
  @Column({ type: 'json', nullable: true })
  options: QuizOptions;
}

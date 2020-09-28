import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { QuizOptions } from '@doorward/common/types/quiz';
import QuestionEntity from '@doorward/common/entities/question.entity';

@ChildEntity(ModuleItemType.QUIZ)
export class QuizEntity extends ModuleItemEntity {
  @Column({ type: 'json', nullable: true })
  options: QuizOptions;

  @Column({ type: 'text' })
  instructions: string;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: Array<QuestionEntity>;
}

import BaseOrganizationEntity from './base.organization.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import ModuleItemEntity from './module.item.entity';
import AnswerEntity from './answer.entity';
import { Expose } from 'class-transformer';

@Entity('Questions')
export default class QuestionEntity extends BaseOrganizationEntity {
  @Column({ type: 'text' })
  question: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => ModuleItemEntity, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
  })
  @Expose({ groups: ['question-quiz'] })
  quiz: ModuleItemEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: Array<AnswerEntity>;
}

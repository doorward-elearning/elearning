import { ChildEntity, Column, OneToMany } from 'typeorm';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { AssignmentOptions } from '@doorward/common/types/assignments';
import AssignmentSubmissionEntity from '@doorward/common/entities/assignment.submission.entity';

@ChildEntity(ModuleItemType.ASSIGNMENT)
export class AssignmentEntity extends ModuleItemEntity {
  @Column({ type: 'json', nullable: true })
  options: AssignmentOptions;

  @Column({ nullable: true })
  assignment: string;

  @OneToMany(() => AssignmentSubmissionEntity, (assignment) => assignment.assignment)
  assignmentSubmissions: Array<AssignmentSubmissionEntity>;
}

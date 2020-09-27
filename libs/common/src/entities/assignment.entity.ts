import { ChildEntity, Column } from 'typeorm';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { AssignmentOptions } from '@doorward/common/types/assignments';

@ChildEntity(ModuleItemType.ASSIGNMENT)
export class AssignmentEntity extends ModuleItemEntity {
  @Column({ type: 'json', nullable: true })
  options: AssignmentOptions;

  @Column({ nullable: true })
  assignment: string;
}

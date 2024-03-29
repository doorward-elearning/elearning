import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ChildEntity, Column } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';

@ChildEntity(ModuleItemType.VIDEO)
export class ModuleVideoEntity extends ModuleItemEntity {
  @Column({ nullable: true })
  videoURL: string;

  @Column({ nullable: true, type: 'text' })
  description: string;
}

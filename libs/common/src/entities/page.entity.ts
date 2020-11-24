import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ChildEntity, Column } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import PageModel  from '@doorward/common/models/page.model';

@ChildEntity(ModuleItemType.PAGE)
export class PageEntity extends ModuleItemEntity implements PageModel {
  @Column({ nullable: true, type: 'text' })
  page: string;
}

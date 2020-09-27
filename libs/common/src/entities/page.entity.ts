import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import { ChildEntity } from 'typeorm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';

@ChildEntity(ModuleItemType.PAGE)
export class PageEntity extends ModuleItemEntity {}

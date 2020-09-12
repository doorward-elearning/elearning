import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import DApiResponse from '@doorward/common/dtos/d.api.response';

export default class ModuleItemResponse extends DApiResponse {
  item: ModuleItemEntity;
}

export class ModuleItemsResponse extends DApiResponse {
  items: ModuleItemEntity[];
}

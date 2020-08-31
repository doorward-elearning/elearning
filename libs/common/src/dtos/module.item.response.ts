import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';

export default interface ModuleItemResponse extends ApiResponse {
  item: ModuleItemEntity;
}

export interface ModuleItemsResponse extends ApiResponse {
  items: ModuleItemEntity[];
}

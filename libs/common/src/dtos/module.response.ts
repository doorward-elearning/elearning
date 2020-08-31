import ModuleEntity from '@doorward/common/entities/module.entity';
import { ApiResponse } from '@doorward/backend/interceptors/transform.interceptor';

export default interface ModuleResponse extends ApiResponse {
  module: ModuleEntity;
}

export interface ModulesResponse extends ApiResponse {
  modules: Array<ModuleEntity>;
}

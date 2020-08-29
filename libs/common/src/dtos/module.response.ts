import ApiBody from '@doorward/common/dtos/api.body';
import ModuleEntity from '@doorward/common/entities/module.entity';

export default interface ModuleResponse extends ApiBody {
  module: ModuleEntity;
}

export interface ModulesResponse extends ApiBody {
  modules: Array<ModuleEntity>;
}

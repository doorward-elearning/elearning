import ModuleEntity from '@doorward/common/entities/module.entity';
import DApiResponse from '@doorward/common/dtos/d.api.response';

export default class ModuleResponse extends DApiResponse {
  module: ModuleEntity;
}

export class ModulesResponse extends DApiResponse {
  modules: Array<ModuleEntity>;
}

export class DeleteModuleResponse extends DApiResponse {
  id: string;
}

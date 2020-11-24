import { Expose } from 'class-transformer';
import ModuleModel from '@doorward/common/models/module.model';
import { UpdateModuleOrderBody } from '@doorward/common/dtos/body';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class ModuleResponse extends DApiResponse {
  @Expose()
  module: ModuleModel;
}

export class ModulesResponse extends DApiResponse {
  @Expose()
  modules: Array<ModuleModel>;
}

export class DeleteModuleResponse extends DApiResponse {
  @Expose()
  id: string;
}

export class UpdateModulesOrderResponse extends DApiResponse {
  @Expose()
  modules: Array<UpdateModuleOrderBody>;
}

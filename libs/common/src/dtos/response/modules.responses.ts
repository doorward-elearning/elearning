import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { UpdateModuleOrderBody } from '@doorward/common/dtos/body';
import DApiResponse from '@doorward/common/dtos/response/base.response';

export class ModuleResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  module: ModuleEntity;
}

export class ModulesResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  modules: Array<ModuleEntity>;
}

export class DeleteModuleResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  id: string;
}

export class UpdateModulesOrderResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  modules: Array<UpdateModuleOrderBody>;
}

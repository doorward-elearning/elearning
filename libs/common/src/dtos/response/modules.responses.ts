import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import DApiResponse from '@doorward/common/dtos/response/index';

export class ModuleItemResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  item: ModuleItemEntity;
}

export class ModuleItemsResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  items: ModuleItemEntity[];
}

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

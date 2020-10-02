import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';

export class CreateModuleBody extends DApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('Please provide the {{module}} title.').nullable(),
    });
  }
}

export class UpdateModuleBody extends CreateModuleBody {}

export class UpdateModuleItemOrderBody {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  order: number;
}

export class UpdateModuleOrderBody {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  order: number;

  @ApiProperty()
  @Expose()
  items: UpdateModuleItemOrderBody[];
}

export class UpdateModulesBody extends DApiBody {
  @ApiProperty()
  @Expose()
  modules: UpdateModuleOrderBody[];

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      modules: Yup.array(
        Yup.object({
          order: Yup.number().required('The order of the {{module}} is required'),
          id: Yup.string().required('The id of the {{module}} is required.'),
        })
      ),
    });
  }
}

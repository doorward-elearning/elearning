import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';

export class CreateModuleItemBody extends DApiBody {
  @ApiProperty()
  @Expose()
  type: ModuleItemType;

  @ApiProperty()
  @Expose()
  content: any;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  order: number;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      type: Yup.string()
        .required('The {{moduleItem}} type is required.')
        .oneOf(Object.values(ModuleItemType), 'Please choose a valid {{moduleItem}} type.')
        .nullable(),
      title: Yup.string().required('The title is required').nullable(),
      content: Yup.mixed().required('The content is required'),
    });
  }
}

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

export class UpdateModuleBody extends CreateModuleBody {
}

export class UpdateModuleOrderBody {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  order: number;
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
        }),
      ),
    });
  }
}

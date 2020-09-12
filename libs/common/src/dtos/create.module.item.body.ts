import ApiBody from '@doorward/common/dtos/api.body';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateModuleItemBody extends ApiBody {
  @ApiProperty()
  @Expose()
  type: ModuleItemType;

  @ApiProperty()
  @Expose()
  content: object | string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  order: number;

  async validation(): Promise<ObjectSchema> {
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

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
  content: object;

  @ApiProperty()
  @Expose()
  title: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      type: Yup.string().oneOf(Object.keys(ModuleItemType), 'Please choose a valid {{moduleItem}} type.').nullable(),
      title: Yup.string().required('The title is required').nullable(),
      content: Yup.object().required('The content is required'),
    });
  }
}

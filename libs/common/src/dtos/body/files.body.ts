import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import translate from '@doorward/common/lang/translate';

export class CreateFileBody extends DApiBody {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  public: boolean;

  @ApiProperty()
  @Expose()
  publicUrl: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string().required(translate.nameRequired()).nullable(),
      public: Yup.boolean().notRequired(),
      publicUrl: Yup.string().required(translate.urlRequired()).nullable(),
    });
  }
}

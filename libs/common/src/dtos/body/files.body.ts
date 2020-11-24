import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { Expose } from 'class-transformer';
import translate from '@doorward/common/lang/translate';

export class CreateFileBody extends DApiBody {
  @Expose()
  name: string;

  @Expose()
  public: boolean;

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

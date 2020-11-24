import { Expose } from 'class-transformer';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import translate from '@doorward/common/lang/translate';

export class AddCourseManagerBody extends DApiBody {
  @Expose()
  managerId: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      managerId: Yup.string().required(translate.courseManagerIdIsRequired()).nullable(),
    });
  }
}

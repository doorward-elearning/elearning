import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { Expose } from 'class-transformer';
import translate from '@doorward/common/lang/translate';

export class SaveAssessmentBody extends DApiBody {
  @Expose()
  submission: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      submission: Yup.string().required(translate.submissionIsRequired()),
    });
  }
}

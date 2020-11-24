import { Expose } from 'class-transformer';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { CreateModuleBody } from '@doorward/common/dtos/body/modules.body';
import DApiBody from '@doorward/common/dtos/body/base.body';
import translate from '@doorward/common/lang/translate';

export class UpdateCourseBody extends DApiBody {
  @Expose()
  title: string;

  @Expose()
  description: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required(translate.courseTitleIsRequired()).nullable(),
      description: Yup.string().notRequired().nullable(),
    });
  }
}

export class CreateCourseBody extends UpdateCourseBody {
  @Expose()
  modules: Array<CreateModuleBody>;

  async validation?(): Promise<ObjectSchema> {
    const validation = await super.validation();
    validation.concat(
      Yup.object({
        modules: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string().required(translate.moduleNameIsRequired()),
            })
          )
          .required(translate.provideAtLeastOneModule()),
      })
    );
    return validation;
  }
}

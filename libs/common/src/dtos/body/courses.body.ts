import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { default as Yup, ObjectSchema } from 'yup';
import { CreateModuleBody } from '@doorward/common/dtos/body/modules.body';
import DApiBody from '@doorward/common/dtos/body/base.body';

export class UpdateCourseBody extends DApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('The {{course}} title is required').nullable(),
    });
  }
}

export class CreateCourseBody extends UpdateCourseBody {
  @ApiProperty()
  @Expose()
  modules: Array<CreateModuleBody>;

  async validation(): Promise<ObjectSchema> {
    const validation = await super.validation();
    validation.concat(
      Yup.object({
        modules: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string().required('The {{module}} name is required'),
            }),
          )
          .required('Please provide at least one {{module}} in the course'),
      }),
    );
    return validation;
  }
}

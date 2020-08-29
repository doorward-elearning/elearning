import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import CreateModuleBody from '@doorward/common/dtos/create.module.body';
import UpdateCourseBody from '@doorward/common/dtos/update.course.body';

export default class CreateCourseBody extends UpdateCourseBody {
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
              title: Yup.string().required('The module name is required'),
            })
          )
          .required('Please provide at least one module in the course'),
      })
    );
    return validation;
  }
}

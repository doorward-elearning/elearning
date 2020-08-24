import ApiBody from '@doorward/common/dtos/api.body';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import CreateModuleBody from '@doorward/common/dtos/create.module.body';

export default class CreateCourseBody extends ApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  modules: Array<CreateModuleBody>;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('The course name is required'),
      modules: Yup.array()
        .of(
          Yup.object().shape({
            title: Yup.string().required('The module name is required'),
          })
        )
        .required('Please provide at least one module in the course'),
    });
  }
}

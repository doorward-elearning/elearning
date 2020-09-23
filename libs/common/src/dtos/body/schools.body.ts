import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as Yup from 'yup';

export class CreateSchoolBody extends DApiBody {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string().required('The {{school}} name is required.').nullable(),
      email: Yup.string().required('The {{school}} email is required').nullable(),
      phoneNumber: Yup.string().required('The {{school}} phone number is required').nullable(),
    });
  }
}

export class CreateClassroomBody extends DApiBody {
  @ApiProperty()
  @Expose()
  name: string;
  async validation(): Promise<ObjectSchema> {
    return Yup.object({
      name: Yup.string().required('The {{classroom}} name is required'),
    });
  }
}

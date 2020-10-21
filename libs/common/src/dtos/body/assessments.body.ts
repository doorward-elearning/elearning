import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as Yup from 'yup';

export class SaveAssessmentBody extends DApiBody {
  @ApiProperty()
  @Expose()
  submission: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      submission: Yup.string().required('The submission is required.'),
    });
  }
}

import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateDiscussionGroupBody extends DApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required('The title for the {{discussionGroup}} is required.').nullable(),
      description: Yup.string().required('The description for the {{discussionGroup}} is required.').nullable(),
    });
  }
}

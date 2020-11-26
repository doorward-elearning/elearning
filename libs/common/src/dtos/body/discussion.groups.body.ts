import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import translate from '@doorward/common/lang/translate';

export class CreateDiscussionGroupBody extends DApiBody {
  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required(translate.titleForDiscussionGroupRequired()).nullable(),
      description: Yup.string().required(translate.descriptionRequired()).nullable(),
    });
  }
}

export class PostDiscussionCommentBody extends DApiBody {
  @ApiProperty()
  @Expose()
  comment: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      comment: Yup.string().required(translate.contentRequired()).nullable(),
    });
  }
}

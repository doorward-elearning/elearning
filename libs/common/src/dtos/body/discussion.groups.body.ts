import DApiBody from '@doorward/common/dtos/body/base.body';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { Expose } from 'class-transformer';
import translate from '@doorward/common/lang/translate';

export class CreateDiscussionGroupBody extends DApiBody {
  @Expose()
  title: string;

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
  @Expose()
  comment: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      comment: Yup.string().required(translate.contentRequired()).nullable(),
    });
  }
}

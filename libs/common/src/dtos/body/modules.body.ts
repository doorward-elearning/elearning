import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import DApiBody from '@doorward/common/dtos/body/base.body';
import translate from '@doorward/common/lang/translate';

export class CreateModuleBody extends DApiBody {
  @Expose()
  title: string;

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      title: Yup.string().required(translate.titleRequired()).nullable(),
    });
  }
}

export class UpdateModuleBody extends CreateModuleBody {
}

export class UpdateModuleItemOrderBody {
  @Expose()
  id: string;

  @Expose()
  order: number;
}

export class UpdateModuleOrderBody {
  @Expose()
  id: string;

  @Expose()
  order: number;

  @Expose()
  items: UpdateModuleItemOrderBody[];
}

export class UpdateModulesBody extends DApiBody {
  @Expose()
  modules: UpdateModuleOrderBody[];

  async validation?(): Promise<ObjectSchema> {
    return Yup.object({
      modules: Yup.array(
        Yup.object({
          order: Yup.number().required(translate.orderRequired()),
          id: Yup.string().required(translate.moduleRequired()),
        }),
      ),
    });
  }
}

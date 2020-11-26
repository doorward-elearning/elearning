import DApiBody from '@doorward/common/dtos/body/base.body';
import { ObjectSchema } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OpenviduWebHookEvents } from '@doorward/common/types/openvidu';

export class OpenviduWebHookBody extends DApiBody {
  @ApiProperty()
  @Expose()
  event: OpenviduWebHookEvents;

  @ApiProperty()
  @Expose()
  sessionId: string;

  async validation?(): Promise<ObjectSchema> {
    return undefined;
  }
}

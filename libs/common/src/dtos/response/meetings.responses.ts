import DApiResponse from '@doorward/common/dtos/response/base.response';
import { Expose } from 'class-transformer';
import MeetingModel from '@doorward/common/models/meeting.model';
import UserModel from '@doorward/common/models/user.model';

export class OpenviduMeetingUser {}

export class MeetingResponse extends DApiResponse {
  @Expose()
  meeting: MeetingModel;

  @Expose()
  user: UserModel;

  @Expose()
  config: object;

  @Expose()
  interfaceConfig: object;
}

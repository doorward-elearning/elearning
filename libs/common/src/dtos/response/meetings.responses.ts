import DApiResponse from '@doorward/common/dtos/response/base.response';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import MeetingEntity from '@doorward/common/entities/meeting.entity';
import Capabilities from '@doorward/common/utils/Capabilities';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import UserEntity from '@doorward/common/entities/user.entity';

export class OpenviduMeetingUser {}

export class MeetingResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  meeting: MeetingEntity;

  @ApiProperty()
  @Expose()
  user: UserEntity;

  @ApiProperty()
  @Expose()
  capabilities?: Capabilities<typeof MeetingCapabilities>;
}

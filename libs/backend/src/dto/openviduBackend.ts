import { ApiProperty } from '@nestjs/swagger';
import { OpenviduUser } from '@doorward/common/types/openvidu';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import UserEntity from '../../../../apps/openvidu-backend/src/database/entities/user.entity';

export class CreateMeetingBody {
  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  user: OpenviduUser;

  @ApiProperty()
  logoUrl: string | { dark: string; base: string } | undefined;

  @ApiProperty()
  capabilities: Array<MeetingCapabilities>;

  @ApiProperty()
  moderatorCapabilities: Array<MeetingCapabilities>;
}

export class CreateMeetingResponse extends UserEntity {
  jwtToken: string;
}

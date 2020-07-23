import { ApiProperty } from '@nestjs/swagger';
import { OpenviduUser, SessionConfig } from '@doorward/common/types/openvidu';
import Capabilities from '@doorward/common/utils/Capabilities';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';

export class ISessionConfig implements SessionConfig {
  @ApiProperty()
  capabilities: Capabilities<typeof MeetingCapabilities>;
  @ApiProperty()
  logoUrl: string | { dark: string; base: string } | undefined;
}

export class CreateSessionBody {
  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  user: OpenviduUser;

  @ApiProperty()
  sessionConfig: ISessionConfig;
}

import React from 'react';
import JitsiMeeting from '@doorward/ui/components/JitsiMeeting';
import { MeetingResponse } from '@doorward/common/dtos/response';

const Meeting: React.FunctionComponent<MeetingProps> = ({
  meetingResponse: { user, meeting, config, interfaceConfig },
  ...props
}): JSX.Element => {
  return (
    <JitsiMeeting
      scripts={['assets/js/jitsi/external_api.min.js']}
      styles={[]}
      domain={process.env.JITSI_MEET_DOMAIN}
      onLeftSession={props.onLeftSession}
      apiRef={props.apiRef}
      options={{
        roomName: meeting.id,
        userInfo: {
          displayName: user.fullName,
          avatarUrl: user.profilePicture,
        },
        interfaceConfigOverwrite: interfaceConfig,
        configOverwrite: config,
      }}
    />
  );
};

export interface MeetingProps {
  meetingResponse: MeetingResponse;
  onLeftSession: () => void;
  apiRef?: (api: JitsiMeetExternalAPI) => void;
}

export default Meeting;

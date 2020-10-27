import React from 'react';
import JitsiMeeting from '@doorward/ui/components/JitsiMeeting';
import { MeetingResponse } from '@doorward/common/dtos/response';

const Meeting: React.FunctionComponent<MeetingProps> = ({
  meetingResponse: { user, meeting, config, interfaceConfig },
  ...props
}): JSX.Element => {
  return (
    <JitsiMeeting
      scripts={[
        'assets/js/jitsi/alwaysontop.min.js',
        'assets/js/jitsi/analytics-ga.js',
        'assets/js/jitsi/app.bundle.min.js',
        'assets/js/jitsi/close3.min.js',
        'assets/js/jitsi/device_selection_popup_bundle.min.js',
        'assets/js/jitsi/dial_in_info_bundle.min.js',
        'assets/js/jitsi/do_external_connect.min.js',
        'assets/js/jitsi/external_api.min.js',
        'assets/js/jitsi/external_connect.js',
        'assets/js/jitsi/flacEncodeWorker.min.js',
        'assets/js/jitsi/lib-jitsi-meet.min.js',
        'assets/js/jitsi/libflac4-1.3.2.min.js',
        'assets/js/jitsi/rnnoise-processor.min.js',
        'assets/js/jitsi/video-blur-effect.min.js',
      ]}
      styles={['assets/css/jitsi.css']}
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

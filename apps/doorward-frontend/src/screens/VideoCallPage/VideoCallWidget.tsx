import React, { useEffect, useState } from 'react';
import useOrganization from '../../hooks/useOrganization';
import DoorwardApi from '../../services/apis/doorward.api';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import LoadingPage from '../LoadingPage';
import Meeting from '../../components/Meeting';
import './VideoCallWidget.scss';
import Empty from '@doorward/ui/components/Empty';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const VideoCallWidget: React.FunctionComponent<VideoCallWidgetProps> = (props): JSX.Element => {
  const organization = useOrganization();
  const [jitsi, setJitsi] = useState<JitsiMeetExternalAPI>();
  const endMeeting = useApiAction(DoorwardApi, (api) => api.meetings.endMeeting);
  const hasPrivilege = usePrivileges();
  const { action: joinMeeting, state: videoCallState } = useApiAction(DoorwardApi, (api) => api.meetings.joinMeeting);
  const history = useHistory();

  useEffect(() => {
    if (props.meetingId) {
      joinMeeting(props.meetingId);
    }
  }, []);

  if (videoCallState.fetching) {
    return <LoadingPage />;
  }
  if (videoCallState.data?.meeting) {
    const { meeting } = videoCallState.data;

    const canModerate = hasPrivilege('meetings.moderate');
    const canPublish = hasPrivilege('meetings.moderate');

    return (
      <div className="video-call-widget">
        <div className="jitsi-meeting">
          <Meeting
            onLeftSession={() => {
              if (canModerate) {
                endMeeting.action(meeting.id);
              }
              history.push('/dashboard');
            }}
            apiRef={(api) => {
              if (!jitsi) {
                setJitsi(api);
              }
            }}
            meetingResponse={videoCallState.data}
          />
        </div>
      </div>
    );
  }
  return <Empty message={translate('meetingNotFound')} icon="no_meeting_room" />;
};

export interface VideoCallWidgetProps {
  meetingId: string;
}

export default VideoCallWidget;

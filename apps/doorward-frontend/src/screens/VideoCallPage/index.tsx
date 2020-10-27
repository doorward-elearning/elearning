import React, { useEffect, useState } from 'react';
import { PageComponent } from '@doorward/ui/types';
import './VideoCallPage.scss';
import usePageResource from '../../hooks/usePageResource';
import Layout from '../Layout';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Empty from '@doorward/ui/components/Empty';
import LoadingPage from '../LoadingPage';
import useOrganization from '../../hooks/useOrganization';
import DoorwardApi from '../../services/apis/doorward.api';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import useAction from '@doorward/ui/hooks/useActions';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import translate from '@doorward/common/lang/translate';
import Meeting from '../../components/Meeting';

const STUDENT_TOOLBAR = [
];

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = (props) => {
  const videoCallState = useDoorwardApi((state) => state.meetings.joinMeeting);
  const organization = useOrganization();
  const [jitsi, setJitsi] = useState<JitsiMeetExternalAPI>();
  const endMeeting = useAction(DoorwardApi.meetings.endMeeting);
  const hasPrivilege = usePrivileges();

  usePageResource('meetingId', DoorwardApi.meetings.joinMeeting);

  useEffect(() => {
    if (jitsi) {
    }
  }, [jitsi]);

  if (videoCallState.fetching) {
    return <LoadingPage />;
  }
  if (videoCallState.data?.meeting) {
    const { meeting } = videoCallState.data;

    const canModerate = hasPrivilege('meetings.moderate');

    return (
      <div className="video-call-page">
        <div className="jitsi-meeting">
          <Meeting
            onLeftSession={() => {
              if (canModerate) {
                endMeeting(meeting.id);
              }
              props.history.push('/dashboard');
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
  return (
    <Layout {...props} navFeatures={[NavbarFeatures.BACK_BUTTON, NavbarFeatures.PAGE_LOGO]}>
      <Empty message={translate.meetingNotFound()} icon="no_meeting_room" />
    </Layout>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

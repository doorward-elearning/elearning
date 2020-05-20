import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Layout, { LayoutFeatures } from '../Layout';
import { useHistory } from 'react-router';
import { joinMeetingAction } from '../../reducers/videoCall/actions';
import useRoutes from '../../hooks/useRoutes';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar/features';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Tools from '@edudoor/common/utils/Tools';
import usePageResource from '@edudoor/ui/hooks/usePageResource';
import { PageComponent } from '@edudoor/ui/types';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const [navFeatures, setNavFeatures] = useState([NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]);
  const videoCallState = useSelector((state: State) => state.videoCall.joinMeeting);
  const history = useHistory();
  const routes = useRoutes();

  usePageResource('meetingId', joinMeetingAction);

  useEffect(() => {
    const meeting = videoCallState?.data?.meeting;
    if (meeting && meeting.sessionId) {
      window.location.href = process.env.REACT_APP_OPENVIDU_URL + '/#/' + meeting.sessionId;
    }
  }, [videoCallState]);

  return (
    <Layout
      {...props}
      navFeatures={navFeatures}
      features={[LayoutFeatures.HEADER]}
      header={Tools.str(videoCallState.data.meeting?.meetingRoom?.title)}
    >
      <WebComponent
        data={videoCallState.data.meeting}
        loading={videoCallState.fetching}
        message="An error occurred while joining the meeting"
        icon="no_meeting_room"
        actionMessage="Go Back"
        onAction={() => routes.navigate(routes.dashboard)}
      >
        {data => {
          return <div>Redirecting to meeting...</div>;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

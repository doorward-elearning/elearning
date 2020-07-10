import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { PageComponent } from '@doorward/ui/types';
import { joinMeetingAction } from '../../reducers/videoCall/actions';
import usePageResource from '../../hooks/usePageResource';
import OpenviduWebComponent from '@doorward/ui/components/OpenviduWebComponent';
import WebComponent from '@doorward/ui/components/WebComponent';
import useAuth from '@doorward/ui/hooks/useAuth';
import Layout from '../Layout';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Empty from '@doorward/ui/components/Empty';
import LoadingPage from '../LoadingPage';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const videoCallState = useSelector((state: State) => state.videoCall.joinMeeting);
  const auth = useAuth();

  usePageResource('meetingId', joinMeetingAction);

  if (videoCallState.fetching) {
    return <LoadingPage />;
  }
  if (videoCallState.data?.meeting) {
    return (
      <div>
        <OpenviduWebComponent
          scriptUrl="assets/js/openvidu-webcomponent.js"
          stylesUrl="assets/css/openvidu-webcomponent.css"
          openviduServerApiURL={process.env.OPENVIDU_API_URL}
          user={auth.authenticated ? auth.user.fullName : 'Anonymous'}
          autoPublish
          chat
          sessionName={videoCallState.data.meeting.sessionId}
          avatar="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwidgetwhats.com%2F2019%2F11%2F06%2Ffree-agent-profile-photo%2F&psig=AOvVaw2cKReuMyayagKW_HKTkDBO&ust=1594480379649000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDo97j8wuoCFQAAAAAdAAAAABAD"
        />
      </div>
    );
  }
  return (
    <Layout {...props} navFeatures={[NavbarFeatures.BACK_BUTTON, NavbarFeatures.PAGE_LOGO]}>
      <Empty message="Meeting ID is invalid" icon="no_meeting_room" />
    </Layout>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { PageComponent } from '@doorward/ui/types';
import { joinMeetingAction } from '../../reducers/videoCall/actions';
import usePageResource from '../../hooks/usePageResource';
import OpenviduWebComponent from '@doorward/ui/components/OpenviduWebComponent';
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
          config={{
            ovServerApiUrl: process.env.OPENVIDU_API_URL,
            sessionId: videoCallState.data.meeting.sessionId,
            sessionTitle: videoCallState.data.meeting.meetingRoom.title,
            nickname: auth.authenticated ? auth.user.fullName : 'Participant',
            avatar: 'https://pbs.twimg.com/profile_images/1197241648926937089/oahb2HSm_400x400.jpg',
          }}
          onLeftSession={() => {
            props.history.goBack();
          }}
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

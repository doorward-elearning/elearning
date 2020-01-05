import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';
import VideoCall from '@edudoor/ui/components/VideoCall';
import WebComponent from '@edudoor/ui/components/WebComponent';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar';
import ConfirmationButton from '@edudoor/ui/components/Buttons/ConfirmationButton';
import { useHistory } from 'react-router';
import usePageResource from '@edudoor/ui/hooks/usePageResource';
import { joinMeetingAction } from '../../reducers/videoCall/actions';
import useRoutes from '../../hooks/useRoutes';
import Tools from '@edudoor/ui/utils/Tools';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const [navFeatures, setNavFeatures] = useState([NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]);
  const videoCallState: any = useSelector((state: State) => state.videoCall.joinMeeting);
  const history = useHistory();
  const routes = useRoutes();

  usePageResource('meetingId', joinMeetingAction, routes);

  const endMeeting = () => {
    history.goBack();
  };
  return (
    <Layout
      {...props}
      navFeatures={navFeatures}
      features={[LayoutFeatures.HEADER]}
      header={Tools.str(videoCallState.data.meetingRoom?.sessionName)}
      renderHeaderEnd={() => (
        <div>
          <ConfirmationButton title="End Meeting" onConfirm={endMeeting} onReject={() => {}} text="End Meeting">
            <span>Do you want to end this meeting?</span>
          </ConfirmationButton>
        </div>
      )}
    >
      <WebComponent
        data={videoCallState.data.meetingRoom}
        loading={videoCallState.fetching}
        message="An error occurred while joining the meeting"
        icon="no_meeting_room"
        actionMessage="Go Back"
        onAction={() => routes.navigate(routes.dashboard)}
      >
        {data => {
          return <VideoCall {...data} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

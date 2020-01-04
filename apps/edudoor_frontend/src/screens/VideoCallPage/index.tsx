import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../../../../libs/ui/types';
import VideoCall from '../../../../../libs/ui/components/VideoCall';
import WebComponent from '../../../../../libs/ui/components/WebComponent';
import { NavbarFeatures } from '../../../../../libs/ui/components/NavBar';
import ConfirmationButton from '../../../../../libs/ui/components/Buttons/ConfirmationButton';
import { useHistory } from 'react-router';
import usePageResource from '../../../../../libs/ui/hooks/usePageResource';
import { joinMeetingAction } from '../../reducers/videoCall/actions';
import useRoutes from '../../../../../libs/ui/hooks/useRoutes';
import Tools from '../../../../../libs/ui/utils/Tools';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const [navFeatures, setNavFeatures] = useState([NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]);
  const videoCallState: any = useSelector((state: State) => state.videoCall.joinMeeting);
  const history = useHistory();
  const routes = useRoutes();

  usePageResource('meetingId', joinMeetingAction);

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

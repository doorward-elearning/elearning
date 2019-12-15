import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import VideoCall from '../../components/ui/VideoCall';
import WebComponent from '../../components/ui/WebComponent';
import { NavbarFeatures } from '../../components/ui/NavBar';
import ConfirmationButton from '../../components/ui/Buttons/ConfirmationButton';
import { useHistory } from 'react-router';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const [navFeatures, setNavFeatures] = useState([NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]);
  const videoCallState: any = useSelector((state: State) => state.videoCall);
  const history = useHistory();

  const endMeeting = () => history.goBack();
  return (
    <Layout
      {...props}
      navFeatures={navFeatures}
      features={[LayoutFeatures.HEADER]}
      header="Mathematics and Computer Science"
      renderHeaderEnd={() => (
        <div>
          <ConfirmationButton onConfirm={endMeeting} onReject={() => {}} text="End Meeting">
            <span>Do you want to end this meeting?</span>
          </ConfirmationButton>
        </div>
      )}
    >
      <WebComponent data={videoCallState.data} loading={true}>
        {data => <VideoCall {...data} leaveSession={endMeeting} />}
      </WebComponent>
    </Layout>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

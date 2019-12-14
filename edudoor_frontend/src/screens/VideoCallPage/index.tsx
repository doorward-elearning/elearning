import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import VideoCall from '../../components/ui/VideoCall';
import WebComponent from '../../components/ui/WebComponent';
import { NavbarFeatures } from '../../components/ui/NavBar';
import IfElse from '../../components/ui/IfElse';
import VideoCallFeedback from '../../components/static/Forms/VideoCallFeedback';
import ConfirmationButton from '../../components/ui/Buttons/ConfirmationButton';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const [running, setRunning] = useState(false);
  const videoCallState: any = useSelector((state: State) => state.videoCall);
  return (
    <Layout
      {...props}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]}
      features={[LayoutFeatures.HEADER]}
      header="Mathematics and Computer Science"
      renderHeaderEnd={() => (
        <div>
          <IfElse condition={running}>
            <ConfirmationButton onConfirm={() => setRunning(false)} onReject={() => {}} text="End Meeting">
              <span>Do you want to end this meeting?</span>
            </ConfirmationButton>
          </IfElse>
        </div>
      )}
    >
      <IfElse condition={running}>
        <WebComponent data={videoCallState.data} loading={true}>
          {data => <VideoCall {...data} leaveSession={() => setRunning(false)} />}
        </WebComponent>
        <React.Fragment>
          <VideoCallFeedback />
        </React.Fragment>
      </IfElse>
    </Layout>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

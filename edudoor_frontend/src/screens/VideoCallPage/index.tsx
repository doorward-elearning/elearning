import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import VideoCall from '../../components/ui/VideoCall';
import WebComponent from '../../components/ui/WebComponent';
import { NavbarFeatures } from '../../components/ui/NavBar';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const videoCallState: any = useSelector((state: State) => state.videoCall);
  return (
    <Layout
      {...props}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT]}
      features={[LayoutFeatures.HEADER]}
      header="Mathematics and Computer Science"
    >
      <WebComponent data={videoCallState.data} loading={true}>
        {data => <VideoCall {...data} />}
      </WebComponent>
    </Layout>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

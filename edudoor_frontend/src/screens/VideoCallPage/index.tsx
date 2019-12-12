import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { PageComponent } from '../../types';
import VideoCall from '../../components/ui/VideoCall';
import WebComponent from '../../components/ui/WebComponent';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const videoCallState: any = useSelector((state: State) => state.videoCall);
  return (
    <WebComponent data={videoCallState.data} loading={true}>
      {data => <VideoCall {...data} />}
    </WebComponent>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

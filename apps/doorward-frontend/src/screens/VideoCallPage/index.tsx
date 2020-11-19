import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import './VideoCallPage.scss';
import VideoCallWidget from './VideoCallWidget';
import { useRouteMatch } from 'react-router';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = (props) => {
  const match = useRouteMatch<{ meetingId: string }>();
  return (
    <div className="video-call-page">
      <VideoCallWidget meetingId={match.params.meetingId} />
    </div>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

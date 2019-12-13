import React from 'react';
import { OpenViduSessionProps } from '../../../reducers/videoCall/actions';
const OpenViduSession = require('openvidu-react').default;
import './VideoCall.scss';

const VideoCall: React.FunctionComponent<VideoCallProps> = props => {
  return (
    <div className="video-call">
      <OpenViduSession {...props} openviduSecret="password" />
    </div>
  );
};

export interface VideoCallProps extends OpenViduSessionProps {
  joinSession?: () => void;
  leaveSession?: () => void;
  error?: () => void;
}

export default VideoCall;

import React from 'react';
import './VideoCall.scss';
import { OpenViduSessionProps } from '../../../reducers/videoCall/actions';
const OpenViduSession = require('openvidu-react').default;

const VideoCall: React.FunctionComponent<VideoCallProps> = props => {
  return (
    <div className="video-call">
      <OpenViduSession {...props} openviduSecret="password" openviduServerUrl={process.env.REACT_APP_OPENVIDU_URL} />
    </div>
  );
};

export interface VideoCallProps extends OpenViduSessionProps {
  joinSession?: () => void;
  leaveSession?: () => void;
  error?: () => void;
}

export default VideoCall;

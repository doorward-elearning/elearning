import React from 'react';
import './VideoCall.scss';
const OpenViduSession = require('openvidu-react').default;

export type OpenViduSessionProps = {
  sessionName: string;
  user: string;
  token: string;
};

const VideoCall: React.FunctionComponent<VideoCallProps> = props => {
  return (
    <div className="video-call">
      <OpenViduSession {...props} openviduSecret="password" openviduServerUrl={props.serverUrl} />
    </div>
  );
};

export interface VideoCallProps extends OpenViduSessionProps {
  joinSession?: () => void;
  leaveSession?: () => void;
  error?: (...args: any[]) => void;
  serverUrl: string;
}

export default VideoCall;

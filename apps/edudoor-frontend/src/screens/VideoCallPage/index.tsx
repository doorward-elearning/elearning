import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { PageComponent } from '@edudoor/ui/types';
import { joinMeetingAction } from '../../reducers/videoCall/actions';
import usePageResource from '../../hooks/usePageResource';
import OpenviduWebComponent from '@edudoor/ui/components/OpenviduWebComponent';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const videoCallState = useSelector((state: State) => state.videoCall.joinMeeting);

  usePageResource('meetingId', joinMeetingAction);

  useEffect(() => {
    const meeting = videoCallState?.data?.meeting;
    if (meeting && meeting.sessionId) {
      window.location.replace(process.env.REACT_APP_OPENVIDU_URL + '/#/' + meeting.sessionId);
    }
  }, [videoCallState]);

  return (
    <div>
      <OpenviduWebComponent
        scriptUrl="assets/js/openvidu-webcomponent.js"
        openviduServerURL={process.env.OPENVIDU_URL}
        openviduSecret={process.env.OPENVIDU_SECRET}
      />
    </div>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

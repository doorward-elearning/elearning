import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { joinMeetingAction } from '../../reducers/videoCall/actions';
import usePageResource from '@edudoor/ui/hooks/usePageResource';
import { PageComponent } from '@edudoor/ui/types';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = props => {
  const videoCallState = useSelector((state: State) => state.videoCall.joinMeeting);

  usePageResource('meetingId', joinMeetingAction);

  useEffect(() => {
    const meeting = videoCallState?.data?.meeting;
    if (meeting && meeting.sessionId) {
      window.location.href = process.env.REACT_APP_OPENVIDU_URL + '/#/' + meeting.sessionId;
    }
  }, [videoCallState]);

  return <div>Redirecting to meeting...</div>;
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

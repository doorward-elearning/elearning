import React, { useEffect, useState } from 'react';
import OpenviduWebComponent from '@doorward/ui/components/OpenviduWebComponent';
import Spinner from '@doorward/ui/components/Spinner';
import { useHistory, useRouteMatch } from 'react-router';
import { MeetingCapabilities } from '@doorward/common/types/meetingCapabilities';
import Capabilities from '@doorward/common/utils/Capabilities';
import { DOORWARD_MEETING_USER, getMeetingInfo, MeetingInfoState } from '../../components/MeetingInfoForm';
import Tools from '@doorward/common/utils/Tools';
import { OPENVIDU_ROLES } from '@doorward/common/types/openvidu';

const Meeting: React.FunctionComponent<MeetingProps> = (props): JSX.Element => {
  const [state, setState] = useState<MeetingInfoState | null>(null);
  const history = useHistory();
  const match = useRouteMatch<{ meetingId: string }>();

  useEffect(() => {
    const stored = getMeetingInfo();
    if (stored && stored.name) {
      setState(stored);
    } else {
      localStorage.setItem(
        DOORWARD_MEETING_USER,
        Tools.encrypt(
          JSON.stringify({
            sessionId: match.params.meetingId,
          })
        )
      );
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  }, []);

  return state ? (
    <OpenviduWebComponent
      scriptUrl="assets/js/openvidu-webcomponent.js"
      stylesUrl="assets/css/openvidu-webcomponent.css"
      config={{
        ovServerApiUrl: process.env.OPENVIDU_API_URL,
        sessionId: state.sessionId,
        sessionTitle: state.sessionName,
        user: {
          name: state.name,
          avatar:
            state.avatar ||
            'https://res.cloudinary.com/dldhztrbs/image/upload/v1597419394/Doorward/yczxlq3jerr9vdmorgws.png',
          role: OPENVIDU_ROLES.MODERATOR,
        },
        sessionConfig: {
          capabilities: new Capabilities(MeetingCapabilities, [
            ...(Object.keys(MeetingCapabilities) as MeetingCapabilities[]),
          ]),
        },
      }}
      onLeftSession={() => {
        window.location.href = '/';
      }}
    />
  ) : (
    <div className="meeting__loading">
      <Spinner type="TailSpin" width={50} height={50} />
    </div>
  );
};

export interface MeetingProps {}

export default Meeting;

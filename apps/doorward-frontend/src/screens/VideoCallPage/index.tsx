import React, { useEffect, useState } from 'react';
import { PageComponent } from '@doorward/ui/types';
import './VideoCallPage.scss';
import usePageResource from '../../hooks/usePageResource';
import OpenviduWebComponent from '@doorward/ui/components/OpenviduWebComponent';
import Layout from '../Layout';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Empty from '@doorward/ui/components/Empty';
import LoadingPage from '../LoadingPage';
import JitsiMeeting from '@doorward/ui/components/JitsiMeeting';
import useOrganization from '../../hooks/useOrganization';
import { MeetingPlatform } from '@doorward/common/types/meeting';
import DoorwardApi from '../../services/apis/doorward.api';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import { Roles } from '@doorward/common/types/roles';
import useAction from '@doorward/ui/hooks/useActions';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';

const STUDENT_TOOLBAR = [
  'microphone',
  'camera',
  'closedcaptions',
  'fullscreen',
  'fodeviceselection',
  'hangup',
  'profile',
  'chat',
  'etherpad',
  'raisehand',
  'filmstrip',
  'invite',
  'feedback',
  'shortcuts',
  'tileview',
  'videobackgroundblur',
  'download',
];

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = (props) => {
  const videoCallState = useDoorwardApi((state) => state.meetings.joinMeeting);
  const organization = useOrganization();
  const [jitsi, setJitsi] = useState<JitsiMeetExternalAPI>();
  const endMeeting = useAction(DoorwardApi.meetings.endMeeting);
  const hasPrivilege = usePrivileges();

  usePageResource('meetingId', DoorwardApi.meetings.joinMeeting);

  useEffect(() => {
    if (jitsi) {
      jitsi.executeCommand('startRecording', { mode: 'file' });
    }
  }, [jitsi]);

  if (videoCallState.fetching) {
    return <LoadingPage />;
  }
  if (videoCallState.data?.meeting) {
    const { meeting, user, capabilities } = videoCallState.data;

    const canModerate = hasPrivilege('meetings.moderate');

    return (
      <div className="video-call-page">
        {!organization || organization.meetingPlatform === MeetingPlatform.OPENVIDU ? (
          <OpenviduWebComponent
            scriptUrl="assets/js/openvidu-webcomponent.js"
            stylesUrl="assets/css/openvidu-webcomponent.css"
            config={{
              ovServerApiUrl: process.env.OPENVIDU_API_URL,
              sessionId: meeting.sessionId,
              sessionTitle: meeting.meetingRoom.title,
              user: {
                name: user.fullName,
                avatar:
                  user.profilePicture ||
                  'https://pbs.twimg.com/profile_images/1197241648926937089/oahb2HSm_400x400.jpg',
              },
              sessionConfig: {
                capabilities,
              },
            }}
            onLeftSession={() => {
              props.history.goBack();
            }}
          />
        ) : (
          <div className="jitsi-meeting">
            <JitsiMeeting
              scripts={[
                'libs/alwaysontop.min.js',
                'libs/analytics-ga.js',
                'libs/app.bundle.min.js',
                'libs/close3.min.js',
                'libs/device_selection_popup_bundle.min.js',
                'libs/dial_in_info_bundle.min.js',
                'libs/do_external_connect.min.js',
                'libs/external_api.min.js',
                'libs/external_connect.js',
                'libs/flacEncodeWorker.min.js',
                'libs/lib-jitsi-meet.min.js',
                'libs/libflac4-1.3.2.min.js',
                'libs/rnnoise-processor.min.js',
                'libs/video-blur-effect.min.js',
              ]}
              styles={['assets/css/jitsi.css']}
              domain={process.env.JITSI_MEET_DOMAIN}
              onLeftSession={() => {
                if (canModerate) {
                  endMeeting(meeting.id);
                }
                props.history.push('/dashboard');
              }}
              apiRef={setJitsi}
              options={{
                roomName: meeting.id,
                userInfo: {
                  displayName: user.fullName,
                  avatarUrl: user.profilePicture,
                },
                configOverwrite: {
                  // prejoinPageEnabled: false,
                  brandingDataUrl: 'https://localhost:7000/api/v1/jitsi/branding',
                  startWithVideoMuted: !canModerate,
                  resolution: 50,
                },
                interfaceConfigOverwrite: {
                  APP_NAME: 'Doorward',
                  TOOLBAR_BUTTONS: !canModerate ? STUDENT_TOOLBAR : undefined,
                },
              }}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <Layout {...props} navFeatures={[NavbarFeatures.BACK_BUTTON, NavbarFeatures.PAGE_LOGO]}>
      <Empty message="Meeting ID is invalid" icon="no_meeting_room" />
    </Layout>
  );
};

export interface VideoCallPageProps extends PageComponent {}

export default VideoCallPage;

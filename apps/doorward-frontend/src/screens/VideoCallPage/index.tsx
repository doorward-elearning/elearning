import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { PageComponent } from '@doorward/ui/types';
import './VideoCallPage.scss';
import { joinMeetingAction } from '../../reducers/videoCall/actions';
import usePageResource from '../../hooks/usePageResource';
import OpenviduWebComponent from '@doorward/ui/components/OpenviduWebComponent';
import Layout from '../Layout';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Empty from '@doorward/ui/components/Empty';
import LoadingPage from '../LoadingPage';
import JitsiMeeting from '@doorward/ui/components/JitsiMeeting';
import useOrganization from '@doorward/ui/hooks/useOrganization';
import { MeetingPlatform } from '@doorward/common/types/meeting';

const VideoCallPage: React.FunctionComponent<VideoCallPageProps> = (props) => {
  const videoCallState = useSelector((state: State) => state.videoCall.joinMeeting);
  const organization = useOrganization();

  usePageResource('meetingId', joinMeetingAction);

  if (videoCallState.fetching) {
    return <LoadingPage />;
  }
  if (videoCallState.data?.meeting) {
    const { meeting, user, capabilities } = videoCallState.data;
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
                ...user,
                avatar: user.avatar || 'https://pbs.twimg.com/profile_images/1197241648926937089/oahb2HSm_400x400.jpg',
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
                if (props.history.canGo(-1)) {
                  props.history.goBack();
                } else {
                  window.location.href = '/';
                }
              }}
              options={{
                roomName: meeting.id,
                userInfo: {
                  displayName: user.name,
                  avatarUrl: user.avatar,
                },
                configOverwrite: {
                  // prejoinPageEnabled: false,
                  brandingDataUrl: 'https://localhost:7000/api/v1/jitsi/branding',
                },
                interfaceConfigOverwrite: {
                  APP_NAME: 'Doorward',
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

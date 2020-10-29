import React from 'react';
import ScriptComponent from '@doorward/ui/components/ScriptComponent';
import './styles/ROMeeting.scss';
import { MainLayout } from '../layouts/main-layout';
import Video from './Video';

class RoMeeting extends ScriptComponent<RoMeetingProps, ROMeetingState> {
  state = {
    remoteTracks: {},
    joined: false,
  };

  connection = null;
  room = null;
  confOptions = {
    openBridgeChannel: true,
  };

  layout = new MainLayout();

  meetingLayoutContainer = React.createRef<HTMLDivElement>();

  componentWillMount(): void {
    if (!this.connection) {
      this.addScripts(
        'https://meet.jit.si/libs/lib-jitsi-meet.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/strophe.js/1.2.16/strophe.min.js',
        'https://cdn.jsdelivr.net/npm/strophejs-plugin-disco@0.0.2/lib/strophe.disco.min.js',
        'https://code.jquery.com/jquery-3.5.1.min.js'
      ).then(() => {
        JitsiMeetJS.init({
          disableAudioLevels: true,
        });
        JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.DEBUG);

        const domain = this.props.domain;

        this.connection = new JitsiMeetJS.JitsiConnection(null, null, {
          hosts: {
            domain: domain,
            muc: `conference.${domain}`,
          },
          clientNode: 'https://jitsi.org/jitsi-meet',
          serviceUrl: `wss://${domain}/xmpp-websocket`,
          p2p: {
            enabled: true,
          },
        });

        this.connection.addEventListener(
          JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
          this.onConnectionSuccess
        );
        this.connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, this.onConnectionFailed);
        this.connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, this.disconnect);

        this.connection.connect();
      });
    }
  }

  componentDidMount(): void {
    if (this.meetingLayoutContainer.current) {
      this.layout.initLayoutContainer(this.meetingLayoutContainer.current);
    }
    window.addEventListener('resize', this.resizeListener);
  }

  resizeListener = () => {
    this.layout.updateLayout();
  };

  onRemoteTrack = (track) => {
    if (track.isLocal()) {
      return;
    }

    const participant = track.getParticipantId();

    const { remoteTracks } = this.state;

    const existingTracks = remoteTracks[participant] || {};

    if (track.getType() === 'video') {
      existingTracks.video = track;
    } else if (track.getType() === 'audio') {
      existingTracks.audio = track;
    }

    this.setState(
      {
        remoteTracks: {
          ...remoteTracks,
          [participant]: existingTracks,
        },
      },
      () => {
        this.layout.updateLayout();
      }
    );
  };

  onUserLeft = (id) => {
    // const { remoteTracks } = this.state;
    // if (!remoteTracks[id]) {
    //   return;
    // }
    // const tracks = remoteTracks[id];
    //
    // if (tracks) {
    //   delete remoteTracks[id];
    //
    //   const updatedTracks = { ...remoteTracks };
    //
    //   this.setState((prevState) => {
    //     return {
    //       remoteTracks: updatedTracks,
    //     };
    //   });
    // }
  };

  onConnectionSuccess = () => {
    this.room = this.connection.initJitsiConference(this.props.meetingId.trim().toLowerCase(), this.confOptions);
    this.room.on(JitsiMeetJS.events.conference.TRACK_ADDED, this.onRemoteTrack);
    this.room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, (track) => {
      console.log('Moses, Track Removed', track);
    });
    this.room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, this.onConferenceJoined);
    this.room.on(JitsiMeetJS.events.conference.USER_JOINED, (id) => {
      this.setState((prevState) => ({
        remoteTracks: { ...prevState.remoteTracks, [id]: {} },
      }));
    });
    this.room.on(JitsiMeetJS.events.conference.USER_LEFT, this.onUserLeft);
    this.room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, (track) => {});
    this.room.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, (userID, displayName) => {});
    this.room.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, (userID, audioLevel) => {});
    this.room.join();
  };

  async componentWillUnmount(): Promise<void> {
    window.removeEventListener('resize', this.resizeListener);
    await this.room.leave();
    await this.connection.disconnect();
  }

  onConferenceJoined = () => {
    this.setState({ joined: true });
  };

  onConnectionFailed = (e) => {
    console.error('Connection Failed', e);
  };

  disconnect = () => {
    this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, this.onConnectionSuccess);
    this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, this.onConnectionFailed);
    this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, this.disconnect);
  };

  render(): JSX.Element {
    const { remoteTracks } = this.state;
    return (
      <div className="ro-meeting">
        <div id="ro-meeting-layout" ref={this.meetingLayoutContainer}>
          {Object.keys(remoteTracks).map((participant) => (
            <Video
              onVideoSizeChanged={() => this.layout.updateLayout(500)}
              audioTrack={remoteTracks[participant].audio}
              videoTrack={remoteTracks[participant].video}
              participantId={participant}
              key={participant}
            />
          ))}
        </div>
      </div>
    );
  }
}

export interface ROMeetingState {
  joined: boolean;
  remoteTracks: Record<
    string,
    {
      video: any;
      audio: any;
    }
  >;
}

export interface RoMeetingProps {
  domain: string;
  meetingId: string;
}

export default RoMeeting;

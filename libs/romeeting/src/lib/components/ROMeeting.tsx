import React from 'react';
import ScriptComponent from '@doorward/ui/components/ScriptComponent';
import './styles/ROMeeting.scss';
import { MainLayout } from '../layouts/main-layout';
import Video from './Video';
import { RemoteUser } from '../types';

class RoMeeting extends ScriptComponent<RoMeetingProps, ROMeetingState> {
  state = {
    remoteUsers: {},
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
        console.log('ROMeeting', 'Scripts initialized...');
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

        console.log('ROMeeting', 'Connecting...');
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

  updateUser = (userId: string, updateFn: (user: RemoteUser) => RemoteUser, callback?: () => void) => {
    const { remoteUsers } = this.state;
    const existingUser = remoteUsers[userId];

    this.setState(
      {
        remoteUsers: {
          ...remoteUsers,
          [userId]: updateFn(existingUser),
        },
      },
      () => {
        this.layout.updateLayout();
        if (callback) callback();
      }
    );
  };

  onRemoteTrack = (track) => {
    if (track.isLocal()) {
      return;
    }

    const userId = track.getParticipantId();
    this.updateUser(userId, (existingUser) => {
      if (track.getType() === 'video') {
        existingUser.tracks.video = track;
      } else if (track.getType() === 'audio') {
        existingUser.tracks.audio = track;
      }
      return existingUser;
    });
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
    console.log('ROMeeting', 'connectionSuccess');
    this.room = this.connection.initJitsiConference(this.props.meetingId.trim().toLowerCase(), this.confOptions);
    this.room.on(JitsiMeetJS.events.conference.TRACK_ADDED, this.onRemoteTrack);
    this.room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, (track) => {
      console.log('Moses, Track Removed', track);
    });
    this.room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, this.onConferenceJoined);
    this.room.on(JitsiMeetJS.events.conference.USER_JOINED, (id, user) => {
      this.setState((prevState) => ({
        remoteUsers: {
          ...prevState.remoteUsers,
          [id]: new RemoteUser(user),
        },
      }));
    });
    this.room.on(JitsiMeetJS.events.conference.USER_LEFT, this.onUserLeft);
    this.room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, (track) => {
      this.updateUser(track.getParticipantId(), (user) => {
        if (track.getType() === 'video') {
          // user.tracks.video = track;
        } else if (track.getType() === 'audio') {
          // user.tracks.audio = track;
        }
        return user;
      });
    });
    this.room.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, (userID, displayName) => {
      this.setState((prevState) => ({
        remoteUsers: {
          ...prevState.remoteUsers,
          [userID]: prevState.remoteUsers[userID].setDisplayName(displayName),
        },
      }));
    });
    this.room.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, (userID, audioLevel) => {});
    console.log('ROMeeting', 'Joining room...');
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
    console.error('ROMeeting', 'Connection Failed', e);
  };

  disconnect = () => {
    this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, this.onConnectionSuccess);
    this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, this.onConnectionFailed);
    this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, this.disconnect);
  };

  render(): JSX.Element {
    const { remoteUsers } = this.state;
    return (
      <div className="ro-meeting">
        <div id="ro-meeting-layout" ref={this.meetingLayoutContainer}>
          {Object.keys(remoteUsers).map((participant) => (
            <Video
              onVideoSizeChanged={() => this.layout.updateLayout(500)}
              user={remoteUsers[participant]}
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
  remoteUsers: Record<string, RemoteUser>;
}

export interface RoMeetingProps {
  domain: string;
  meetingId: string;
}

export default RoMeeting;

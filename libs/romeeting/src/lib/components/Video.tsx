import React from 'react';
import { RemoteUser, Track, Tracks } from '../types';
import Icon from '@doorward/ui/components/Icon';

class Video extends React.Component<VideoProps, VideoState> {
  state = {
    largeSize: false,
  };

  videoRef = React.createRef<HTMLVideoElement>();
  audioRef = React.createRef<HTMLAudioElement>();
  parentRef = React.createRef<HTMLDivElement>();

  componentWillMount(): void {}

  componentDidMount(): void {
    const {
      user: { tracks },
    } = this.props;

    this.attachTracks(tracks);
  }

  attachTracks = (tracks: Tracks) => {
    if (tracks?.video && this.videoRef.current) {
      tracks.video.attach(this.videoRef.current);
    }
    if (tracks?.audio && this.audioRef.current) {
      tracks.audio.attach(this.audioRef.current);
    }
  };

  detachTracks = (tracks: Tracks) => {
    if (tracks?.video && this.videoRef.current) {
      tracks.video.detach(this.videoRef.current);
    }
    if (tracks?.audio && this.audioRef.current) {
      tracks.audio.detach(this.audioRef.current);
    }
  };

  componentWillReceiveProps(nextProps: Readonly<VideoProps>, nextContext: any): void {
    const { tracks } = nextProps.user;
    this.attachTracks(tracks);
  }

  componentWillUnmount(): void {}

  toggleSize = () => {
    const largeSize = !this.state.largeSize;

    this.setState(
      {
        largeSize,
      },
      () => {
        const element = this.parentRef.current;

        const bigElements = document.getElementsByClassName('JI_Video_Big');

        for (let i = 0; i < bigElements.length; i++) {
          bigElements[i].classList.remove('JI_Video_Big');
        }

        if (element) {
          if (largeSize) {
            element.classList.add('JI_Video_Big');
          } else {
            element.classList.remove('JI_Video_Big');
          }
          this.props.onVideoSizeChanged(largeSize);
        }
      }
    );
  };

  render() {
    const { user } = this.props;
    const { video, audio } = user.tracks;
    console.log(user, 'ROMeeting');

    if (this.videoRef?.current && !this.videoRef.current.playing) {
      video.attach(this.videoRef.current);
    }

    return (
      <div ref={this.parentRef} onDoubleClick={() => this.toggleSize()} className="JI_Video">
        <div className="JI_Video__content">
          {video && !video.hasBeenMuted && <video ref={this.videoRef} autoPlay muted />}
          <audio ref={this.audioRef} autoPlay />
          <div className="JI_Video__content__footer">
            <div className="user__displayName">{user.getDisplayName()}</div>
            <div className="user__videoControls">
              <Icon icon={!audio || audio.hasBeenMuted ? 'mic_off' : 'mic'} />
              <Icon icon={!video || video.hasBeenMuted ? 'videocam_off' : 'videocam'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export interface VideoProps {
  participantId: string;
  user: RemoteUser;
  onVideoSizeChanged?: (big: boolean) => void;
}

export interface VideoState {
  largeSize: boolean;
}

export default Video;

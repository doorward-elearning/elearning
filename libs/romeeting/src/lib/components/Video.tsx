import React from 'react';

class Video extends React.Component<VideoProps, VideoState> {
  state = {
    largeSize: false,
  };

  videoRef = React.createRef<HTMLVideoElement>();
  audioRef = React.createRef<HTMLAudioElement>();
  parentRef = React.createRef<HTMLDivElement>();

  componentWillMount(): void {}

  addEventListeners = (track: any) => {
    if (track) {
      track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, (audioLevel) =>
        console.log(`Audio Level remote: ${audioLevel}`)
      );
      track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('remote track muted'));
      track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, () => console.log('remote track stoped'));
      track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, (deviceId) =>
        console.log(`track audio output device was changed to ${deviceId}`)
      );
    }
  };

  componentDidMount(): void {
    const { videoTrack, audioTrack } = this.props;

    this.addEventListeners(videoTrack);
    this.addEventListeners(audioTrack);
    this.attachTracks();
  }

  attachTracks = (props = this.props) => {
    this.attachTrack(props.videoTrack, this.videoRef.current);
    this.attachTrack(props.audioTrack, this.audioRef.current);
  };

  attachTrack = (track: any, element: HTMLVideoElement | HTMLAudioElement) => {
    if (element && track) {
      track.attach(element);
    }
  };

  detachTrack = (track: any, element: HTMLVideoElement | HTMLAudioElement) => {
    if (element && track) {
      track.detach(element);
    }
  };

  componentWillReceiveProps(nextProps: Readonly<VideoProps>, nextContext: any): void {
    this.attachTracks(nextProps);
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
    return (
      <div ref={this.parentRef} onDoubleClick={() => this.toggleSize()} className="JI_Video">
        <div className="JI_Video__content">
          <video autoPlay={true} ref={this.videoRef} />
          <audio autoPlay={true} ref={this.audioRef} />
        </div>
      </div>
    );
  }
}

export interface VideoProps {
  participantId: string;
  audioTrack: any;
  videoTrack: any;
  onVideoSizeChanged?: (big: boolean) => void;
}

export interface VideoState {
  largeSize: boolean;
}

export default Video;

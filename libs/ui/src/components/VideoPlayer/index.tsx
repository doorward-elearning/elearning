import React from 'react';
import Plyr from 'plyr-react';
import isYoutubeVideo from '@doorward/common/regex/isYoutubeVideo';

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = React.memo(
  (props): JSX.Element => {
    return (
      <Plyr
        source={{
          sources: [{ src: props.source, provider: isYoutubeVideo(props.source) ? 'youtube' : 'html5' }],
          type: 'video',
        }}
        options={props.options}
      />
    );
  },
  (prevProps, nextProps) => prevProps.source === nextProps.source
);

export interface VideoPlayerProps {
  source: any;
  options?: any;
}

export default VideoPlayer;

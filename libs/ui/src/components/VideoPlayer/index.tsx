import React from 'react';
import Plyr from 'plyr-react';
import isYoutubeVideo, { isVimeoVideo } from '@doorward/common/regex/isYoutubeVideo';

const getProvider = (src: string): Plyr.Provider => {
  if (isYoutubeVideo(src)) {
    return 'youtube';
  } else if (isVimeoVideo(src)) {
    return 'vimeo';
  }
  return 'html5';
};

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = React.memo(
  (props): JSX.Element => {
    return (
      <Plyr
        source={{
          sources: [
            {
              src: props.source,
              provider: getProvider(props.source),
            },
          ],
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

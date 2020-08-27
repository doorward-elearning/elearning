import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './YouTubePrivateVideo.scss';

const YouTubePrivateVideo: React.FunctionComponent<YouTubePrivateVideoProps> = (props): JSX.Element => {
  const [videos, setVideos] = useState<
    Array<{
      url: string;
      format: string;
      size: '1080p' | '720p' | '480p' | '360p' | '240p';
    }>
  >([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://maadhav-ytdl.herokuapp.com/video_info.php?url=${props.link}`)
      .then((response) => {
        const data = response.data;
        if (data.links) {
          const result = [];
          data.links.map((link) => {
            const { url, format } = link;

            if (format.includes('video')) {
              const [extension, , quality] = format.split(',');
              result.push({
                url,
                format: extension.trim(),
                size: quality,
              });
            }
          });

          setVideos(result.sort((a, b) => +b.size?.replace('p', '') - +a.size?.replace('p', '')));
        }
      })
      .catch(() => setFailed(true));
  }, [props.link]);

  const getBestVideo = (): string => {
    return videos.length ? videos[0].url : '';
  };
  function getYoutubeId() {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = props.link.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  return failed ? (
    <div>
      <iframe
        src={`https://youtube.com/embed/${getYoutubeId()}?showInfo=0&rel=0`}
        width="100%"
        height="400px"
        title="Youtube Video"
        allowFullScreen
      />
    </div>
  ) : (
    <video
      width="100%"
      height="auto"
      className="youtube-private-video"
      controls
      onError={() => setFailed(true)}
      src={getBestVideo()}
      controlsList="nodownload"
    />
  );
};

export interface YouTubePrivateVideoProps {
  link: string;
}

export default YouTubePrivateVideo;

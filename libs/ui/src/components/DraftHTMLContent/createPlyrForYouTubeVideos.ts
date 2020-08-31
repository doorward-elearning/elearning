function getYoutubeId(link) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = link.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

const YOUTUBE_VIDEO_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;

export const createPlyrForYouTubeVideos = (element: HTMLDivElement) => {
  const players = [];
  if (element) {
    setTimeout(() => {
      const iFrames = element.querySelectorAll('iframe');
      iFrames.forEach((iframe) => {
        if (YOUTUBE_VIDEO_REGEX.test(iframe.src)) {
          const parent = iframe.parentElement;
          parent.removeChild(iframe);
          const newDiv = document.createElement('div');
          newDiv.setAttribute('data-plyr-provider', 'youtube');
          newDiv.setAttribute('data-plyr-embed-id', getYoutubeId(iframe.src));
          parent.appendChild(newDiv);

          const player = new Plyr(newDiv);

          players.push(player);
        }
      });
    }, 100);
  }
};

export default createPlyrForYouTubeVideos;

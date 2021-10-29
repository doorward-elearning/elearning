import { url } from "inspector";

const YOUTUBE_VIDEO_REGEX = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;
const VIMEO_VIDEO_REGEX = /^.*(vimeo.com\/|video\/)(\d+).*/;

/**
 * Checks if a URl is a youtube video
 * @param url
 */
const isYoutubeVideo = (url: string): boolean => {
  return YOUTUBE_VIDEO_REGEX.test(url);
};

export const isVimeoVideo = (url: string): boolean => {
  return VIMEO_VIDEO_REGEX.test(url);
};

export default isYoutubeVideo;

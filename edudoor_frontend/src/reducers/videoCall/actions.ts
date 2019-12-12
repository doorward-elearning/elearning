import { END_VIDEO_CALL, START_VIDEO_CALL } from './types';

export type OpenViduSessionProps = {
  sessionName: string;
  user: string;
  token: string;
};

export const endVideoCall = () => ({
  type: END_VIDEO_CALL,
});

export const startVideoCall = (data: OpenViduSessionProps) => ({
  type: START_VIDEO_CALL,
  data,
});

import { END_VIDEO_CALL, START_VIDEO_CALL } from './types';
import { Action } from '../reducers';

const initialState = {
  data: {},
  status: 'IDLE',
};

export default (state = initialState, action: Action): any => {
  switch (action.type) {
  case START_VIDEO_CALL:
    return {
      ...state,
      data: action.payload,
      status: 'RUNNING',
    };
  case END_VIDEO_CALL:
    return {
      ...state,
      data: {},
      status: 'IDLE',
    };
  default:
    return state;
  }
};

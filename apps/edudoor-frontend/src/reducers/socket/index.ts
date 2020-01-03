import { Action } from '../reducers';
import * as types from './types';

export type SocketEvents = typeof types;

export type SocketData = {
  type: keyof SocketEvents;
  payload: any;
};

const initialState: { [n in keyof SocketEvents]?: any } = {};

export default (state = initialState, action: Action) => {
  let newState = state;
  (Object.values(types) as Array<keyof SocketEvents>).forEach(type => {
    if (type === action.type) {
      newState = {
        ...newState,
        [type]: action.payload,
      };
    }
  });
  return newState;
};

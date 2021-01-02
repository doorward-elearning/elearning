import createReduxStore from '@doorward/ui/store/createReduxStore';
import { DoorwardApiReducers } from '../services/apis/doorward.api';
import { DoorwardChatApiReducers } from '@doorward/ui/services/doorward.chat.api';

const store = createReduxStore(
  {},
  {
    DoorwardApi: DoorwardApiReducers,
    DoorwardChatApi: DoorwardChatApiReducers,
  }
);

const state = store.getState();

export type State = typeof state;

export default store;

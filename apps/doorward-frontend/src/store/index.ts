import createReduxStore from '@doorward/ui/store/createReduxStore';
import DoorwardApi from '../services/apis/doorward.api';
import DoorwardChatApi from '@doorward/ui/services/doorward.chat.api';

const store = createReduxStore(
  {},
  {
    DoorwardApi,
    DoorwardChatApi,
  }
);

const state = store.getState();

export type State = typeof state;

export default store;

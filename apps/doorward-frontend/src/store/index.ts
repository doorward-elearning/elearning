import createReduxStore from '@doorward/ui/store/createReduxStore';
import { DoorwardApiReducers } from '../services/apis/doorward.api';

const store = createReduxStore(
  {},
  {
    DoorwardApi: DoorwardApiReducers,
  }
);

const state = store.getState();

export type State = typeof state;

export default store;

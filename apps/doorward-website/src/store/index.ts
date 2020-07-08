import createReduxStore from '@doorward/ui/store/createReduxStore';
import freeTrial from '../reducers/freeTrial';

const store = createReduxStore({
  freeTrial,
});

const state = store.getState();

export type State = typeof state;

export default store;

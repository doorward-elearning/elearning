import reducers from './reducers';
import createReduxStore from '@edudoor/ui/store/createReduxStore';

const store = createReduxStore(reducers);

const state = store.getState();

export type State = typeof state;

export default store;

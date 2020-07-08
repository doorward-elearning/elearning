import reducerBuilder, { modifyReducer, reducerApiAction } from '@doorward/ui/reducers/builder';
import { CLEAR_SUGGESTIONS, FETCH_SUGGESTIONS } from './types';
import Api from '../../services/api';

const suggestions = reducerApiAction({
  action: FETCH_SUGGESTIONS,
  api: Api.suggestions.get,
  reducer: (state, action) => {
    if (action.type === CLEAR_SUGGESTIONS) {
      return modifyReducer('data.suggestions', state, action, () => []);
    }
    return state;
  },
});

export default reducerBuilder({
  middleware: { suggestions },
});

import { CLEAR_SUGGESTIONS, FETCH_SUGGESTIONS } from './types';

export const getSuggestionsAction = (type: string) => ({
  type: FETCH_SUGGESTIONS,
  payload: [type],
});

export const clearSuggestionsAction = () => ({
  type: CLEAR_SUGGESTIONS,
});

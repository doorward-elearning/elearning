import { CLEAR_SUGGESTIONS, FETCH_SUGGESTIONS } from './types';
import { ParsedUrlQuery } from 'querystring';

export const getSuggestionsAction = (type: string, query?: ParsedUrlQuery) => ({
  type: FETCH_SUGGESTIONS,
  payload: [type, query],
});

export const clearSuggestionsAction = () => ({
  type: CLEAR_SUGGESTIONS,
});

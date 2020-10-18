import { useReducer } from 'react';

function useMergeState<T>(initialState: T) {
  return useReducer((state, newState) => ({ ...state, ...newState }), initialState);
}

export default useMergeState;

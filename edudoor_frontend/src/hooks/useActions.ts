import { useDispatch } from 'react-redux';
import { Action } from '../reducers/reducers';

function useAction<T extends (...args: any) => Action>(action: T): (...args: Parameters<typeof action>) => Action {
  const dispatch = useDispatch();

  return (...args: Parameters<typeof action>) => dispatch(action(...args));
}

export default useAction;

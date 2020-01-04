import { useDispatch } from 'react-redux';
import { Action } from '@edudoor/frontend/src/reducers/reducers';

function useAction<T extends (...args: any) => Action>(
  action: T,
  actionParams?: { [n in keyof Action]?: any }
): (...args: Parameters<typeof action>) => Action {
  const dispatch = useDispatch();

  return (...args: Parameters<typeof action>) => dispatch({ ...action(...args), ...(actionParams || {}) });
}

export default useAction;

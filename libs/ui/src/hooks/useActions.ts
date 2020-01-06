import { useDispatch } from 'react-redux';
import { Action } from '../reducers/reducers';

function useAction<T extends (...args: any) => Action>(
  action: T,
  actionParams?: { [n in keyof Action]?: any }
): (...args: Parameters<typeof action>) => Action {
  const dispatch = useDispatch();

  return (...args: Parameters<typeof action>) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    dispatch({ ...action(...args), ...(actionParams || {}) });
}

export default useAction;

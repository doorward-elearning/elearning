import { useDispatch } from 'react-redux';
import { Action } from '../reducers/reducers';
import { useCallback } from 'react';

function useAction<T extends (...args: any) => Action>(
  action: T,
  actionParams?: { [n in keyof Action]?: any }
): (...args: Parameters<typeof action>) => Action {
  const dispatch = useDispatch();

  const isActionParams = (arg: any) => {
    return !(
      arg?.onSuccess === undefined &&
      arg?.onError === undefined &&
      arg?.showSuccessToast === undefined &&
      arg?.showErrorToast === undefined &&
      arg?.statusCode === undefined &&
      arg?.payload === undefined
    );
  };

  return useCallback(
    function (...args: Parameters<typeof action>) {
      const lastArg = args?.[args.length - 1];

      if (isActionParams(lastArg)) {
        args = args.slice(0, args.length - 1);
      }

      const params = { ...(actionParams || {}), ...((isActionParams(lastArg) && lastArg) || {}) };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return dispatch({ ...action(...args), ...params });
    },
    [action, actionParams]
  );
}

export default useAction;

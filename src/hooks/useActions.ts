import { useDispatch } from 'react-redux';
import { Action, ActionCreator, ActionCreatorArgs, ActionsMap, StoreActionMap } from '../reducers/reducers';
import { Dispatch } from 'redux';
import { action } from '../reducers/builder';

const build = (dispatch: Dispatch, action: ActionCreator): ActionCreator => (...args: any[]): Action =>
  dispatch(action(...args));

function useActions<T extends ActionsMap>(actions: T): StoreActionMap<T> {
  const dispatch = useDispatch();
  const keys: string[] = Object.keys(actions);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return keys.reduce(
    (acc: StoreActionMap<T>, cur: string): StoreActionMap<T> => ({
      ...acc,
      [cur]: build(dispatch, actions[cur]),
    }),
    {}
  );
}

export function useAction(args: ActionCreatorArgs): ActionCreator {
  const dispatch = useDispatch();

  return build(dispatch, action(args));
}

export default useActions;

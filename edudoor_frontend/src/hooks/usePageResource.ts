import { ActionCreator } from '../reducers/reducers';
import { useRouteMatch } from 'react-router';
import { useEffect } from 'react';
import useAction from './useActions';

const usePageResource = (key: string, action: ActionCreator, args: any[] = []) => {
  const match: any = useRouteMatch();

  const dispatchAction = useAction(action);

  const allArgs = [match.params[key], ...args];

  useEffect(() => {
    dispatchAction(...allArgs);
  }, []);
};

export default usePageResource;

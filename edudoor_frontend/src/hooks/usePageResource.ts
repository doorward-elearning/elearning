import { ActionCreator } from '../reducers/reducers';
import { useRouteMatch } from 'react-router';
import { useEffect } from 'react';
import useAction from './useActions';
import useRoutes from './useRoutes';

const usePageResource = (key: string, action: ActionCreator, args: any[] = []) => {
  const match: any = useRouteMatch();
  const routes = useRoutes();

  const dispatchAction = useAction(action);

  const allArgs = [match.params[key], ...args];
  if (routes.currentRoute) {
    routes.setParams(routes.currentRoute, {
      ...match.params,
    });
  }

  useEffect(() => {
    dispatchAction(...allArgs);
  }, []);
};

export default usePageResource;

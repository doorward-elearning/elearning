import { useRouteMatch } from 'react-router';
import { useEffect } from 'react';
import useAction from './useActions';
import { ActionCreator } from '../reducers/reducers';
import { RouteNames, Routes } from '../types';

const usePageResource = <T extends RouteNames>(
  key: string,
  action: ActionCreator,
  routes: Routes<T>,
  args: any[] = []
) => {
  const match: any = useRouteMatch();
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

import { useRouteMatch } from 'react-router';
import { useEffect } from 'react';
import useAction from './useActions';
import { ActionCreator } from '../reducers/reducers';
import { RouteNames, Routes } from '../types';
import useRoutes from '../../../../apps/edudoor-frontend/src/hooks/useRoutes';

const usePageResource = <T extends RouteNames>(key: string, action: ActionCreator, args: any[] = []) => {
  const match: any = useRouteMatch();
  const dispatchAction = useAction(action);
  const routes = useRoutes();

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

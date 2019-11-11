import { AppContext, AppContextProps } from '../index';
import { useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { RouteDefinition, RouteDefinitions } from '../types';
import { EdudoorRoutes } from '../routes';

export interface UseRoutes extends AppContextProps, RouteDefinitions {
  navigate: (route: RouteDefinition, params?: { [name: string]: string }) => void;
  currentRoute?: keyof EdudoorRoutes;
}

const useRoutes = (): UseRoutes => {
  const context = useContext(AppContext);
  const history = useHistory();
  const match: any = useRouteMatch();

  const tree = (Object.keys(context.routes) as Array<keyof EdudoorRoutes>).find(route => {
    const detail = context.routes[route];
    if (detail) {
      return detail.link === match.path || detail.link === match.url;
    }
    return false;
  });

  const navigate = (route: RouteDefinition, params = {}): void => {
    history.push(route.withParams(params));
  };
  return {
    ...context,
    ...context.routes,
    currentRoute: tree,
    navigate,
  };
};

export default useRoutes;

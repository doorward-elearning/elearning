import { RouteDefinition, RouteDefinitions, RouteNames } from '../types';
import { EdudoorRoutes } from '@edudoor/frontend/src/routes';
import { useHistory, useRouteMatch } from 'react-router';

export interface UseApplicationRoutes<T extends RouteNames> {
  navigate: (route: RouteDefinition<T>, params?: { [name: string]: string | undefined }) => void;
  currentRoute?: keyof T;
}

function useApplicationRoutes<T extends RouteNames>(routes: RouteDefinitions<T>): UseApplicationRoutes<T> {
  const history = useHistory();
  const match: any = useRouteMatch();

  const tree = (Object.keys(routes) as Array<keyof EdudoorRoutes>).find(route => {
    const detail = routes[route];
    if (detail) {
      return (
        detail.link === match.path ||
        detail.link === match.url ||
        detail.matchURL === match.url ||
        detail.matchURL === match.path
      );
    }
    return false;
  });

  const navigate = (route: RouteDefinition<T>, params = {}): void => {
    history.push(route.withParams(params));
  };
  return {
    currentRoute: tree,
    navigate,
  };
}

export default useApplicationRoutes;

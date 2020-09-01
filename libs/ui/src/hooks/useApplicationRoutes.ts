import { RouteDefinition, RouteDefinitions, RouteNames } from '@doorward/ui/types';
import { useHistory, useRouteMatch } from 'react-router';

export interface UseApplicationRoutes<T extends RouteNames> {
  navigate: (route: RouteDefinition<T>, params?: { [name: string]: string | undefined }) => void;
  href: (route: RouteDefinition<T>, params?: { [name: string]: string | undefined }) => void;
  currentRoute?: keyof T;
  reload: () => void;
}

function useApplicationRoutes<T extends RouteNames>(routes: RouteDefinitions<T>): UseApplicationRoutes<T> {
  const history = useHistory();
  const match: any = useRouteMatch();

  const tree = (Object.keys(routes) as Array<keyof T>).find((route) => {
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

  const navigate = (route: RouteDefinition<T>, params = {}, query: string = ''): void => {
    history.push(route.withParams(params) + query);
  };

  const href = (route: RouteDefinition<T>, params = {}, query: string = ''): void => {
    window.location.href = route.withParams(params) + query;
  };

  const reload = () => {
    history.replace(history.location.pathname);
  };

  return {
    currentRoute: tree,
    navigate,
    href,
    reload,
  };
}

export default useApplicationRoutes;

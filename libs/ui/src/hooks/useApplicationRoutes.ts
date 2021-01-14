import { RouteDefinition, RouteDefinitions, RouteNames } from '@doorward/ui/types';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

export interface UseApplicationRoutes<T extends RouteNames> {
  navigate: (
    route: RouteDefinition<T>,
    params?: { [name: string]: string | number | undefined },
    query?: { [name: string]: string | number | undefined }
  ) => void;
  currentRoute?: keyof T;
}

function useApplicationRoutes<T extends RouteNames>(routes: RouteDefinitions<T>): UseApplicationRoutes<T> {
  const history = useHistory();
  const match: any = useRouteMatch();
  const location = useLocation();

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

  const navigate = (route: RouteDefinition<T>, params = {}, query = {}): void => {
    const queryParams = new URLSearchParams(location.search);

    Object.keys(query).forEach((key) => {
      if (query[key]) {
        queryParams.set(key, query[key]);
      }
    });

    let url = route?.withParams ? route.withParams(params) : '';

    if (queryParams.toString()) {
      url += '?' + queryParams.toString();
    }

    history.push(url);
  };

  return {
    currentRoute: tree,
    navigate,
  };
}

export default useApplicationRoutes;

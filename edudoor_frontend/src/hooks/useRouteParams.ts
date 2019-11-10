import useRoutes from './useRoutes';
import { useRouteMatch } from 'react-router';
import ROUTES from '../routes/routes';
import { RouteDefinition } from '../types';

const useRouteParams = (params: any, route?: RouteDefinition): void => {
  const match: any = useRouteMatch();
  const routes = useRoutes();

  const currentRoute: undefined | keyof typeof ROUTES = route
    ? route.id
    : (Object.keys(ROUTES) as Array<keyof typeof ROUTES>).find(r => ROUTES[r].link === match.url);

  if (currentRoute) {
    routes.setParams(currentRoute, params);
  }
};

export default useRouteParams;

import React, { ReactNode } from 'react';
import { RouteProps, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthenticatedRoute, { AuthenticatedRouteProps } from './AuthenticatedRoute';
import { RouteDefinition, RouteDefinitions, Routes } from '../types';
import NotFound from '../views/NotFound';
import { EdudoorRoutes, routeConfigurations, routes } from './index';
import Tools from '../utils/Tools';
import { EdudoorRoute } from './EdudoorRoute';

const routeDefinitions: any = {};

const generateRoutes = (r: Routes, parentLink = '', path: Array<keyof typeof routes>): Array<ReactNode> => {
  if (parentLink.endsWith('/')) {
    parentLink = parentLink.substr(0, parentLink.length - 1);
  }
  return (Object.keys(r) as Array<keyof EdudoorRoutes>).reduce((acc: Array<ReactNode>, current) => {
    const more: Array<ReactNode> = [];
    const detail: EdudoorRoute | undefined = r[current];
    if (detail) {
      const fullLink = parentLink + detail.path;
      const props: RouteProps & AuthenticatedRouteProps = {
        exact: true,
        path: fullLink,
        component: detail.component,
        authRedirect: detail.redirectLink,
        roles: detail.allowedRoles,
      };

      const Component = detail.allowedRoles.length ? AuthenticatedRoute : Route;

      const newPath = [...path];
      if (detail.component && !detail.hideBreadCrumb) {
        newPath.push(current);
      }

      if (detail.routes) {
        more.push(...generateRoutes(detail.routes, fullLink, newPath));
      }
      if (props.component) {
        more.push(<Component {...props} key={fullLink} />);
      }

      routeDefinitions[current] = {
        name: routes[current],
        link: fullLink,
        matchURL: fullLink,
        roles: detail.allowedRoles,
        withParams: (params: { [name: string]: any }): string => {
          return Tools.createRoute(fullLink, params);
        },
        tree: newPath,
        id: current,
      } as RouteDefinition;
    }

    return [...more, ...acc];
  }, []);
};

export const generatedRoutes = generateRoutes(routeConfigurations, '', []);

export const Router: React.FunctionComponent<any> = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      {generatedRoutes}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

const ROUTES = routeDefinitions as RouteDefinitions;

export default ROUTES;

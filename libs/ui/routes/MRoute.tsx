import { Roles } from '@edudoor/frontend/src/components/RolesManager';
import * as React from 'react';
import { EdudoorRoutes, routes } from './index';
import { RouteDefinition, Routes } from '@edudoor/frontend/src/types';
import { ReactNode } from 'react';
import { Route, RouteProps } from 'react-router';
import AuthenticatedRoute, { AuthenticatedRouteProps } from './AuthenticatedRoute';
import Tools from '@edudoor/frontend/src/utils/Tools';

export class MRoute {
  path: string;
  allowedRoles: Array<Roles>;
  routes: { [name in keyof EdudoorRoutes]?: MRoute };
  component?: React.FunctionComponent<any>;
  hideBreadCrumb?: boolean;
  redirectLink: keyof typeof routes;

  constructor(path: string, component?: React.FunctionComponent<any>) {
    this.path = path;
    this.routes = {};
    this.hideBreadCrumb = false;
    this.allowedRoles = [Roles.ALL];
    this.component = component;
    this.redirectLink = 'dashboard';
  }

  roles(...roles: Array<Roles>): MRoute {
    this.allowedRoles = roles || [];
    return this;
  }

  public(): MRoute {
    this.allowedRoles = [];
    return this;
  }

  redirect(link: keyof typeof routes): MRoute {
    this.redirectLink = link;
    return this;
  }

  hideCrumb(): MRoute {
    this.hideBreadCrumb = true;
    return this;
  }

  with(routes: { [name in keyof EdudoorRoutes]?: MRoute }): MRoute {
    this.routes = routes;
    return this;
  }
}

const routeDefinitions: any = {};

export const generateRoutes = (r: Routes, parentLink = '', path: Array<keyof typeof routes>): Array<ReactNode> => {
  if (parentLink.endsWith('/')) {
    parentLink = parentLink.substr(0, parentLink.length - 1);
  }
  return (Object.keys(r) as Array<keyof EdudoorRoutes>).reduce((acc: Array<ReactNode>, current) => {
    const more: Array<ReactNode> = [];
    const detail: MRoute | undefined = r[current];
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

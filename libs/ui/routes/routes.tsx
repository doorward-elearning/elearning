import React, { ReactNode } from 'react';
import { RouteProps } from 'react-router';
import { RouteDefinition, RouteDefinitions, RouteNames, Routes } from '../types';
import Tools from '../utils/Tools';
import { Roles } from '../components/RolesManager';
import MRoute from './MRoute';

const routeDefinitions: any = {};

interface MRouteProps<T extends RouteNames> extends RouteProps {
  authRedirect: keyof T;
  roles: Array<Roles>;
}

function generateRoutes<T extends RouteNames>(
  routeNames: T,
  r: Routes<T>,
  parentLink = '',
  path: Array<keyof T>,
  render: (props: MRouteProps<T>) => JSX.Element
): Array<ReactNode> {
  if (parentLink.endsWith('/')) {
    parentLink = parentLink.substr(0, parentLink.length - 1);
  }
  return (Object.keys(r) as Array<keyof T>).reduce((acc: Array<ReactNode>, current) => {
    const more: Array<ReactNode> = [];
    const detail: MRoute<T> | undefined = r[current];
    if (detail) {
      const fullLink = parentLink + detail.path;
      const props: MRouteProps<T> = {
        exact: true,
        path: fullLink,
        component: detail.component,
        authRedirect: detail.redirectLink,
        roles: detail.allowedRoles,
      };

      const newPath = [...path];
      if (detail.component && !detail.hideBreadCrumb) {
        newPath.push(current);
      }

      if (detail.routes) {
        more.push(...generateRoutes(routeNames, detail.routes, fullLink, newPath, render));
      }
      if (props.component) {
        more.push(render(props));
      }

      routeDefinitions[current] = {
        name: routeNames[current],
        link: fullLink,
        matchURL: fullLink,
        roles: detail.allowedRoles,
        withParams: (params: { [name: string]: any }): string => {
          return Tools.createRoute(fullLink, params);
        },
        tree: newPath,
        id: current,
      } as RouteDefinition<T>;
    }

    return [...more, ...acc];
  }, []);
}

export function generate<T extends RouteNames>(
  routeNames: T,
  routeConfigurations: Routes<T>,
  render: (props: MRouteProps<T>) => JSX.Element
): {
  renderRoutes: Array<ReactNode>;
  routes: RouteDefinitions<T>;
} {
  return {
    renderRoutes: generateRoutes(routeNames, routeConfigurations, '', [], render),
    routes: routeDefinitions as RouteDefinitions<T>,
  };
}

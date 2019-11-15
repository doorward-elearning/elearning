import { Roles } from '../components/static/RolesManager';
import * as React from 'react';
import { EdudoorRoutes, routes } from './index';

export class EdudoorRoute {
  path: string;
  allowedRoles: Array<Roles>;
  routes: { [name in keyof EdudoorRoutes]?: EdudoorRoute };
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

  roles(...roles: Array<Roles>): EdudoorRoute {
    this.allowedRoles = roles;
    return this;
  }

  public(): EdudoorRoute {
    this.allowedRoles = [];
    return this;
  }

  redirect(link: keyof typeof routes): EdudoorRoute {
    this.redirectLink = link;
    return this;
  }

  hideCrumb(): EdudoorRoute {
    this.hideBreadCrumb = true;
    return this;
  }

  with(routes: { [name in keyof EdudoorRoutes]?: EdudoorRoute }): EdudoorRoute {
    this.routes = routes;
    return this;
  }
}

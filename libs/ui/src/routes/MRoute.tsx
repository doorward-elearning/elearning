import * as React from 'react';
import { RoleEvaluator, Roles } from '../components/RolesManager';
import { RouteNames, Routes } from '@doorward/ui/types';

export default class MRoute<T extends RouteNames> {
  path: string;
  allowedRoles: Array<Roles | RoleEvaluator>;
  routes: Routes<T>;
  component?: React.FunctionComponent<any>;
  hideBreadCrumb?: boolean;
  redirectLink: keyof T;

  constructor(path: string, component?: React.FunctionComponent<any>) {
    this.path = path;
    this.routes = {};
    this.hideBreadCrumb = false;
    this.allowedRoles = [Roles.ALL];
    this.component = component;
    this.redirectLink = '' as keyof T;
  }

  roles(...roles: Array<Roles | RoleEvaluator>): MRoute<T> {
    this.allowedRoles = roles || [];
    return this;
  }

  public(): MRoute<T> {
    this.allowedRoles = [];
    return this;
  }

  redirect(link: keyof T): MRoute<T> {
    this.redirectLink = link;
    return this;
  }

  hideCrumb(): MRoute<T> {
    this.hideBreadCrumb = true;
    return this;
  }

  with(routes: { [name in keyof T]?: MRoute<T> }): MRoute<T> {
    this.routes = routes;
    return this;
  }
}

import * as React from 'react';
import { RouteNames, Routes } from '@doorward/ui/types';

export default class MRoute<T extends RouteNames> {
  path: string;
  allowedPrivileges: Array<string>;
  routes: Routes<T>;
  component?: React.FunctionComponent<any>;
  hideBreadCrumb?: boolean;
  redirectLink: keyof T;

  constructor(path: string, component?: React.FunctionComponent<any>) {
    this.path = path;
    this.routes = {};
    this.hideBreadCrumb = false;
    this.allowedPrivileges = [];
    this.component = component;
    this.redirectLink = '' as keyof T;
  }

  privileges(...privileges: Array<string>): MRoute<T> {
    this.allowedPrivileges = privileges || [];
    return this;
  }

  public(): MRoute<T> {
    this.allowedPrivileges = [];
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

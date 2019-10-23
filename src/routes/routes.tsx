import React from 'react';
import { RouteProps } from 'react-router';
import { Route } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Courses from '../views/Courses';
import { ReactNode } from 'react';
import AuthenticatedRoute from './AuthenticatedRoute';
import { RouteDefinitions, Routes } from '../types';

export type EdudoorRoutes = {
  home: string;
  login: string;
  dashboard: string;
  courses: string;
  courseList: string;
};

const routes: EdudoorRoutes = {
  home: 'Home',
  login: 'Login',
  dashboard: 'Dashboard',
  courses: 'Courses',
  courseList: 'Course List',
};

const routeConfigurations: Routes = {
  home: {
    link: '/',
    component: Home,
    authenticated: false,
    routes: {
      login: { link: '/login', component: Login, authenticated: false },
      dashboard: {
        link: '/dashboard',
        component: Dashboard,
        authenticated: true,
        routes: {
          courses: {
            link: '/courses',
            authenticated: false,
            routes: {
              courseList: { link: '/list', component: Courses, authenticated: false },
            },
          },
        },
      },
    },
  },
};

const routeDefinitions: any = {};

const generateRoutes = (r: Routes, parentLink = ''): Array<ReactNode> => {
  if (parentLink.endsWith('/')) {
    parentLink = parentLink.substr(0, parentLink.length - 1);
  }
  return (Object.keys(r) as Array<keyof EdudoorRoutes>).reduce((acc: Array<ReactNode>, current) => {
    const more: Array<ReactNode> = [];
    const detail = r[current];
    if (detail) {
      const fullLink = parentLink + detail.link;
      const props: RouteProps = {
        exact: true,
        path: fullLink,
        component: detail.component,
      };

      const Component = detail.authenticated ? AuthenticatedRoute : Route;

      if (detail.routes) {
        more.push(...generateRoutes(detail.routes, fullLink));
      }
      if (props.component) {
        more.push(<Component {...props} key={fullLink} />);
      }

      routeDefinitions[current] = {
        name: routes[current],
        link: fullLink,
      };
    }

    return [...more, ...acc];
  }, []);
};

export const generatedRoutes = generateRoutes(routeConfigurations, '');

const ROUTES = routeDefinitions as RouteDefinitions;

export default ROUTES;

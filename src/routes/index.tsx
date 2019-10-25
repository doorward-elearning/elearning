import { Routes } from '../types';
import Home from '../views/Home';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Courses from '../views/Courses';
import ViewCourse from '../views/Courses/ViewCourse';

export const routes = {
  home: 'Home',
  login: 'Login',
  dashboard: 'Dashboard',
  courses: 'Courses',
  courseList: 'Course List',
  createCourse: 'Create Course',
  viewCourse: 'View Course',
};

export type EdudoorRoutes = {
  [key in keyof typeof routes]: string;
};

export const routeConfigurations: Routes = {
  home: {
    link: '/',
    component: Home,
    authenticated: false,
    hideCrumb: true,
    routes: {
      login: { link: '/login', component: Login, authenticated: false },
      dashboard: {
        link: '/dashboard',
        component: Dashboard,
        authenticated: true,
        routes: {
          courses: {
            link: '/courses',
            authenticated: true,
            routes: {
              courseList: {
                link: '/list',
                component: Courses,
                authenticated: true,
                routes: {
                  viewCourse: { link: '/view', component: ViewCourse, authenticated: true },
                },
              },
              createCourse: { link: '/create', component: Courses, authenticated: true },
            },
          },
        },
      },
    },
  },
};

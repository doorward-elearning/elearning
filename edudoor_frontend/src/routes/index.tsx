import { Routes } from '../types';
import Home from '../views/Home';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Courses from '../views/Courses';
import ViewCourse from '../views/Courses/ViewCourse';
import CourseStudentList from '../views/Courses/CourseStudentList';
import AddCourseStudent from '../views/Students/AddCourseStudent';
import StudentList from '../views/Students/StudentList';
import AddStudent from '../views/Students/AddStudent';
import AddModulePage from '../views/Courses/Modules/AddModulePage';
import ViewModuleItem from '../views/Courses/Modules/ViewModuleItem';
import * as React from 'react';
import Profile from '../views/Profile';
import CreatePassword from '../views/Password/CreatePassword';

export class EdudoorRoute {
  path: string;
  allowedRoles: Array<string>;
  routes: { [name in keyof EdudoorRoutes]?: EdudoorRoute };
  component?: React.FunctionComponent<any>;
  hideBreadCrumb?: boolean;

  constructor(path: string, component?: React.FunctionComponent<any>) {
    this.path = path;
    this.routes = {};
    this.hideBreadCrumb = false;
    this.allowedRoles = ['*'];
    this.component = component;
  }

  roles(...roles: Array<string>) {
    this.allowedRoles = roles;
    return this;
  }

  public() {
    this.allowedRoles = [];
    return this;
  }

  hideCrumb() {
    this.hideBreadCrumb = true;
    return this;
  }

  with(routes: { [name in keyof EdudoorRoutes]?: EdudoorRoute }) {
    this.routes = routes;
    return this;
  }
}

export const routes = {
  home: 'Home',
  login: 'Login',
  dashboard: 'Dashboard',
  courses: 'Courses',
  createCourse: 'Create Course',
  viewCourse: 'View Course',
  courseStudents: 'Students taking course',
  courseList: 'All Courses',
  addCourseStudent: 'Add Student',
  students: 'Students',
  studentList: 'All Students',
  newStudent: 'Add Student',
  addModulePage: 'Add Page',
  modules: 'Modules',
  moduleItems: 'Module Items',
  viewModuleItem: 'Module Item',
  myProfile: 'My Profile',
  createPassword: 'Create Password',
  password: 'Password',
};

export type EdudoorRoutes = typeof routes;

const Route = EdudoorRoute;

export const routeConfigurations: Routes = {
  home: new Route('/', Home)
    .public()
    .hideCrumb()
    .with({
      login: new Route('/login', Login).public(),
      dashboard: new Route('/dashboard', Dashboard).with({
        courses: new Route('/courses').with({
          courseList: new Route('/', Courses).with({
            viewCourse: new Route('/:courseId', ViewCourse).with({
              courseStudents: new Route('/students', CourseStudentList).with({
                addCourseStudent: new Route('/new', AddCourseStudent),
              }),
              modules: new Route('/modules').with({
                moduleItems: new Route('/:moduleId/items').with({
                  viewModuleItem: new Route('/:itemId', ViewModuleItem),
                  addModulePage: new Route('/create/page', AddModulePage),
                }),
              }),
            }),
          }),
          createCourse: new Route('/create', Courses),
        }),
        students: new Route('/students').with({
          studentList: new Route('/', StudentList),
          newStudent: new Route('/create', AddStudent),
        }),
        myProfile: new Route('/profile/:username', Profile),
      }),
      password: new Route('/password')
        .public()
        .hideCrumb()
        .with({
          createPassword: new Route('/create/:resetToken/:resetTokenBuffer', CreatePassword).public().hideCrumb(),
        }),
    }),
};

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
import { Roles } from '../components/static/RolesManager';
import { EdudoorRoute } from './EdudoorRoute';
import NotFound from '../views/NotFound';

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
  reports: 'Reports',
  studentReports: 'Student Reports',
  teacherReports: 'Teacher Reports',
  courseReports: 'Courses Reports',
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
        students: new Route('/students').roles(Roles.TEACHER).with({
          studentList: new Route('/', StudentList).roles(Roles.TEACHER),
          newStudent: new Route('/create', AddStudent).roles(Roles.TEACHER),
        }),
        myProfile: new Route('/profile/:username', Profile),
      }),
      reports: new Route('/reports').roles(Roles.TEACHER).with({
        studentReports: new Route('/students', NotFound),
        courseReports: new Route('/courses', NotFound),
        teacherReports: new Route('/teachers', NotFound),
      }),
      password: new Route('/password')
        .public()
        .hideCrumb()
        .with({
          createPassword: new Route('/create/:resetToken/:resetTokenBuffer', CreatePassword).public().hideCrumb(),
        }),
    }),
};

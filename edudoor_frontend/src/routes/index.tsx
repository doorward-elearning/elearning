import { Routes } from '../types';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Courses from '../screens/Courses';
import ViewCourse from '../screens/Courses/ViewCourse';
import CourseStudentList from '../screens/Courses/CourseStudentList';
import AddCourseStudent from '../screens/Students/AddCourseStudent';
import StudentList from '../screens/Students/StudentList';
import AddStudent from '../screens/Students/AddStudent';
import AddModulePage from '../screens/Courses/Modules/AddModulePage';
import ViewModuleItem from '../screens/Courses/Modules/ViewModuleItem';
import * as React from 'react';
import Profile from '../screens/Profile';
import CreatePassword from '../screens/Password/CreatePassword';
import { Roles } from '../components/static/RolesManager';
import { EdudoorRoute } from './EdudoorRoute';
import NotFound from '../screens/NotFound';
import StudentListReport from '../screens/Reports/StudentListReport';
import StudentReport from '../screens/Reports/StudentReport';
import CourseCreatorListReport from '../screens/Reports/CourseCreatorListReport';
import CourseCreatorReport from '../screens/Reports/CourseCreatorReport';
import CreateAssignment from '../screens/Courses/Modules/CreateAssignment';
import ForgotPassword from '../screens/Password/ForgotPassword';
import Register from '../screens/Register';

export const routes = {
  home: 'Home',
  login: 'Login',
  register: 'Register',
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
  studentListReports: 'Student Reports',
  teacherListReports: 'Teacher Reports',
  courseListReports: 'Courses Reports',
  changePassword: 'Change Password',
  studentReport: 'Student Report',
  teacherReport: 'Teacher Report',
  addAssignment: 'Create Assignment',
  forgotPassword: 'Forgot password',
  resetPassword: 'Reset password',
};

export type EdudoorRoutes = typeof routes;

const Route = EdudoorRoute;

export const routeConfigurations: Routes = {
  home: new Route('/', Home)
    .public()
    .hideCrumb()
    .with({
      login: new Route('/login', Login).public(),
      register: new Route('/register', Register).public(),
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
                  addAssignment: new Route('/create/assignment', CreateAssignment),
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
        myProfile: new Route('/profile/:username', Profile).with({
          changePassword: new Route('/changePassword', Profile),
        }),
        reports: new Route('/reports').roles(Roles.TEACHER).with({
          studentListReports: new Route('/students', StudentListReport).with({
            studentReport: new Route('/:studentId', StudentReport),
          }),
          courseListReports: new Route('/courses', NotFound),
          teacherListReports: new Route('/teachers', CourseCreatorListReport).roles().with({
            teacherReport: new Route('/:teacherId', CourseCreatorReport),
          }),
        }),
      }),
      password: new Route('/password')
        .public()
        .hideCrumb()
        .with({
          createPassword: new Route('/create/:resetToken/:resetTokenBuffer', CreatePassword).public().hideCrumb(),
          resetPassword: new Route('/reset/:resetToken/:resetTokenBuffer', CreatePassword).public().hideCrumb(),
          forgotPassword: new Route('/forgot', ForgotPassword).public().hideCrumb(),
        }),
    }),
};

import { Routes } from '@edudoor/frontend/src/types';
import Home from '@edudoor/frontend/src/screens/Home';
import Login from '@edudoor/frontend/src/screens/Login';
import Dashboard from '@edudoor/frontend/src/screens/Dashboard';
import Courses from '@edudoor/frontend/src/screens/Courses';
import ViewCourse from '@edudoor/frontend/src/screens/Courses/ViewCourse';
import CourseStudentList from '@edudoor/frontend/src/screens/Courses/CourseStudentList';
import AddCourseStudent from '@edudoor/frontend/src/screens/Students/AddCourseStudent';
import StudentList from '@edudoor/frontend/src/screens/Students/StudentList';
import AddStudent from '@edudoor/frontend/src/screens/Students/AddStudent';
import AddModulePage from '@edudoor/frontend/src/screens/Courses/Modules/AddModulePage';
import ViewModuleItem from '@edudoor/frontend/src/screens/Courses/Modules/ViewModuleItem';
import * as React from 'react';
import Profile from '@edudoor/frontend/src/screens/Profile';
import CreatePassword from '@edudoor/frontend/src/screens/Password/CreatePassword';
import { Roles } from '@edudoor/frontend/src/components/RolesManager';
import { MRoute } from './MRoute';
import Error404 from '@edudoor/frontend/src/screens/ErrorPages/Error404';
import StudentListReport from '@edudoor/frontend/src/screens/Reports/StudentListReport';
import StudentReport from '@edudoor/frontend/src/screens/Reports/StudentReport';
import TeacherListReport from '@edudoor/frontend/src/screens/Reports/TeacherListReport';
import TeacherReport from '@edudoor/frontend/src/screens/Reports/TeacherReport';
import CreateAssignment from '@edudoor/frontend/src/screens/Courses/Modules/CreateAssignment';
import ForgotPassword from '@edudoor/frontend/src/screens/Password/ForgotPassword';
import Register from '@edudoor/frontend/src/screens/Register';
import CreateQuiz from '@edudoor/frontend/src/screens/Courses/Modules/CreateQuiz';
import VideoCallPage from '@edudoor/frontend/src/screens/VideoCallPage';
import TeacherList from '@edudoor/frontend/src/screens/Teachers/TeacherList';
import AddTeacher from '@edudoor/frontend/src/screens/Teachers/AddTeacher';

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
  addQuiz: 'Create Quiz',
  addAssignment: 'Create Assignment',
  forgotPassword: 'Forgot password',
  resetPassword: 'Reset password',
  editModuleItem: 'Edit Module Item',
  videoCall: 'Video Call',
  teachers: 'Teachers',
  teacherList: 'All Teachers',
  addTeacher: 'Add Teacher',
};

export type EdudoorRoutes = typeof routes;

const Route = MRoute;

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
                  editModuleItem: new Route('/:itemId/edit', ViewModuleItem).roles(Roles.TEACHER),
                  addModulePage: new Route('/create/page', AddModulePage),
                  addAssignment: new Route('/create/assignment', CreateAssignment),
                  addQuiz: new Route('/create/quiz', CreateQuiz),
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
        teachers: new Route('/teachers').roles(Roles.SUPER_ADMINISTRATOR).with({
          teacherList: new Route('/', TeacherList).roles(Roles.SUPER_ADMINISTRATOR),
          addTeacher: new Route('/create', AddTeacher).roles(Roles.SUPER_ADMINISTRATOR),
        }),
        myProfile: new Route('/profile/:username', Profile).with({
          changePassword: new Route('/changePassword', Profile),
        }),
        reports: new Route('/reports').roles(Roles.TEACHER).with({
          studentListReports: new Route('/students', StudentListReport).with({
            studentReport: new Route('/:studentId', StudentReport),
          }),
          courseListReports: new Route('/courses', Error404),
          teacherListReports: new Route('/teachers', TeacherListReport).roles().with({
            teacherReport: new Route('/:teacherId', TeacherReport),
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
  videoCall: new Route('/meeting/:meetingId', VideoCallPage),
};

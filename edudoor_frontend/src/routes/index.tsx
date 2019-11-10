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
};

export type EdudoorRoutes = typeof routes;

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
                link: '/',
                component: Courses,
                authenticated: true,
                routes: {
                  viewCourse: {
                    link: '/:courseId',
                    component: ViewCourse,
                    authenticated: true,
                    routes: {
                      courseStudents: {
                        link: '/students',
                        component: CourseStudentList,
                        authenticated: true,
                        routes: {
                          addCourseStudent: { link: '/new', component: AddCourseStudent, authenticated: true },
                        },
                      },
                      modules: {
                        authenticated: true,
                        link: '/modules/:moduleId',
                        routes: {
                          moduleItems: {
                            link: '/items',
                            authenticated: true,
                            routes: {
                              addModulePage: {
                                link: '/newPage',
                                authenticated: true,
                                component: AddModulePage,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              createCourse: { link: '/create', component: Courses, authenticated: true },
            },
          },
          students: {
            link: '/students',
            authenticated: true,
            routes: {
              studentList: {
                link: '/',
                authenticated: true,
                component: StudentList,
              },
              newStudent: {
                link: '/new',
                authenticated: true,
                component: AddStudent,
              },
            },
          },
        },
      },
    },
  },
};

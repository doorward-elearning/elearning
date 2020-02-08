import Error404 from '../screens/ErrorPages/Error404';
import ViewCourse from '../screens/Courses/ViewCourse';
import Dashboard from '../screens/Dashboard';
import Courses from '../screens/Courses';
import AddModulePage from '../screens/Courses/Modules/AddModulePage';
import ViewModuleItem from '../screens/Courses/Modules/ViewModuleItem';
import CourseStudentList from '../screens/Courses/CourseStudentList';
import TeacherList from '../screens/Teachers/TeacherList';
import StudentReport from '../screens/Reports/StudentReport';
import CreatePassword from '../screens/Password/CreatePassword';
import Home from '../screens/Home';
import AddTeacher from '../screens/Teachers/AddTeacher';
import VideoCallPage from '../screens/VideoCallPage';
import StudentList from '../screens/Students/StudentList';
import AddCourseStudent from '../screens/Students/AddCourseStudent';
import TeacherReport from '../screens/Reports/TeacherReport';
import StudentListReport from '../screens/Reports/StudentListReport';
import Login from '../screens/Login';
import ForgotPassword from '../screens/Password/ForgotPassword';
import TeacherListReport from '../screens/Reports/TeacherListReport';
import Register from '../screens/Register';
import CreateAssignment from '../screens/Courses/Modules/CreateAssignment';
import AddStudent from '../screens/Students/AddStudent';
import CreateQuiz from '../screens/Courses/Modules/CreateQuiz';
import Profile from '../screens/Profile';
import MRoute from '@edudoor/ui/routes/MRoute';
import { Routes } from '@edudoor/ui/types';
import { Roles } from '@edudoor/ui/components/RolesManager';
import StudentGroups from '../screens/Groups/Students/StudentGroups';
import CreateStudentGroup from '../screens/Groups/Students/CreateStudentGroup';
import TeacherGroups from '../screens/Groups/Teachers/TeacherGroups';
import CreateTeacherGroup from '../screens/Groups/Teachers/CreateTeacherGroup';
import ViewGroup from '../screens/Groups/ViewGroup';
import Organizations from '../screens/Organizations';
import CreateOrganization from '../screens/Organizations/CreateOrganization';
import EditOrganization from '../screens/Organizations/EditOrganization';

export const routeNames = {
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
  studentGroups: 'Students',
  addStudentGroup: 'Add Student Group',
  teacherGroups: 'Teachers',
  addTeacherGroup: 'Add Teacher Group',
  groups: 'Groups',
  editStudentGroup: 'Edit Student Group',
  viewStudentGroup: 'View Student Group',
  viewTeacherGroup: 'View Teacher Group',
  organizations: 'Organizations',
  createOrganization: 'Create Organization',
  editOrganization: 'Edit Organization',
};

export type EdudoorRoutes = typeof routeNames;

const Route = MRoute;

export const routeConfigurations: Routes<EdudoorRoutes> = {
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
        groups: new Route('/groups').roles(Roles.SUPER_ADMINISTRATOR, Roles.TEACHER).with({
          teacherGroups: new Route('/teachers', TeacherGroups).roles(Roles.SUPER_ADMINISTRATOR).with({
            addTeacherGroup: new Route('/create', CreateTeacherGroup).roles(Roles.SUPER_ADMINISTRATOR),
            viewTeacherGroup: new Route('/view/:groupId', ViewGroup).roles(Roles.SUPER_ADMINISTRATOR),
          }),
          studentGroups: new Route('/students', StudentGroups).roles(Roles.TEACHER).with({
            addStudentGroup: new Route('/create', CreateStudentGroup).roles(Roles.TEACHER),
            viewStudentGroup: new Route('/view/:groupId', ViewGroup).roles(Roles.TEACHER),
          }),
        }),
        organizations: new Route('/organizations', Organizations)
          .roles(Roles.SUPER_ADMINISTRATOR, user => {
            console.log('Mosesssssssssss', user);
            return user.organizationId === process.env.EDUDOOR_ORGANIZATION_ID;
          })
          .with({
            createOrganization: new Route('/create', CreateOrganization).roles(Roles.SUPER_ADMINISTRATOR),
            editOrganization: new Route('/:organizationId/edit/', EditOrganization).roles(Roles.SUPER_ADMINISTRATOR),
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

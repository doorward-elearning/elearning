import { lazy } from 'react';

import MRoute from '@doorward/ui/routes/MRoute';
import { Routes } from '@doorward/ui/types';
import { routeNames } from './routeNames';
import Login from '../screens/Login';

const Error404 = lazy(() => import('../screens/ErrorPages/Error404'));
const ViewCourse = lazy(() => import('../screens/Courses/ViewCourse'));
const Dashboard = lazy(() => import('../screens/Dashboard'));
const Courses = lazy(() => import('../screens/Courses'));
const AddModulePage = lazy(() => import('../screens/Courses/Modules/AddModulePage'));
const ViewModuleItem = lazy(() => import('../screens/Courses/Modules/ViewModuleItem'));
const CourseStudentList = lazy(() => import('../screens/Courses/CourseStudentList'));
const TeacherList = lazy(() => import('../screens/Teachers/TeacherList'));
const StudentReport = lazy(() => import('../screens/Reports/StudentReport'));
const CreatePassword = lazy(() => import('../screens/Password/CreatePassword'));
const Home = lazy(() => import('../screens/Home'));
const AddTeacher = lazy(() => import('../screens/Teachers/AddTeacher'));
const VideoCallPage = lazy(() => import('../screens/VideoCallPage'));
const StudentList = lazy(() => import('../screens/Students/StudentList'));
const AddCourseStudent = lazy(() => import('../screens/Students/AddCourseStudent'));
const TeacherReport = lazy(() => import('../screens/Reports/TeacherReport'));
const StudentListReport = lazy(() => import('../screens/Reports/StudentListReport'));
const ForgotPassword = lazy(() => import('../screens/Password/ForgotPassword'));
const TeacherListReport = lazy(() => import('../screens/Reports/TeacherListReport'));
const Register = lazy(() => import('../screens/Register'));
const CreateAssignment = lazy(() => import('../screens/Courses/Modules/CreateAssignment'));
const AddStudent = lazy(() => import('../screens/Students/AddStudent'));
const CreateQuiz = lazy(() => import('../screens/Courses/Modules/CreateQuiz'));
const Profile = lazy(() => import('../screens/Profile'));
const StudentGroups = lazy(() => import('../screens/Groups/Students/StudentGroups'));
const CreateStudentGroup = lazy(() => import('../screens/Groups/Students/CreateStudentGroup'));
const TeacherGroups = lazy(() => import('../screens/Groups/Teachers/TeacherGroups'));
const CreateTeacherGroup = lazy(() => import('../screens/Groups/Teachers/CreateTeacherGroup'));
const ViewGroup = lazy(() => import('../screens/Groups/ViewGroup'));
const Organizations = lazy(() => import('../screens/Organizations'));
const CreateOrganization = lazy(() => import('../screens/Organizations/CreateOrganization'));
const EditOrganization = lazy(() => import('../screens/Organizations/EditOrganization'));
const ChatScreen = lazy(() => import('../screens/ChatScreen'));
const AssignmentsList = lazy(() => import('../screens/Courses/Modules/AssignmentsList'));
const Classrooms = lazy(() => import('../screens/Classrooms'));
const SchoolClassrooms = lazy(() => import('../screens/Classrooms/SchoolClassrooms'));
const ViewStudent = lazy(() => import('../screens/Students/ViewStudent'));
const ViewStudentGroup = lazy(() => import('../screens/Groups/Students/ViewStudentGroup'));
const UpdateStudentGroup = lazy(() => import('../screens/Groups/Students/UpdateStudentGroup'));

export type DoorwardRoutes = ReturnType<typeof routeNames>;

const Route = MRoute;

export const routeConfigurations: Routes<DoorwardRoutes> = {
  home: new Route('/', Home)
    .public()
    .hideCrumb()
    .with({
      login: new Route('/login', Login).public(),
      register: new Route('/register', Register).public(),
      classrooms: new Route('/classrooms', Classrooms).public().with({
        schoolClassrooms: new Route('/:schoolId', SchoolClassrooms).public(),
      }),
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
                  editModuleItem: new Route('/:itemId/edit', ViewModuleItem).privileges('moduleItems.update'),
                  addModulePage: new Route('/create/page', AddModulePage),
                  addAssignment: new Route('/create/assignment', CreateAssignment),
                  addQuiz: new Route('/create/quiz', CreateQuiz),
                }),
                assignmentList: new Route('/assignments', AssignmentsList),
              }),
            }),
          }),
          createCourse: new Route('/create', Courses),
        }),
        students: new Route('/students').privileges('students.*').with({
          studentList: new Route('/', StudentList).privileges('students.list').with({
            viewStudent: new Route('/:studentId', ViewStudent).privileges('students.view'),
          }),
          newStudent: new Route('/create', AddStudent).privileges('students.create'),
        }),
        teachers: new Route('/teachers').privileges('teachers.*').with({
          teacherList: new Route('/', TeacherList).privileges('teachers.list'),
          addTeacher: new Route('/create', AddTeacher).privileges('teachers.create'),
        }),
        myProfile: new Route('/profile/:username', Profile).with({
          changePassword: new Route('/changePassword', Profile),
        }),
        reports: new Route('/reports').privileges('reports.*').with({
          studentListReports: new Route('/students', StudentListReport).with({
            studentReport: new Route('/:studentId', StudentReport),
          }),
          courseListReports: new Route('/courses', Error404),
          teacherListReports: new Route('/teachers', TeacherListReport).privileges().with({
            teacherReport: new Route('/:teacherId', TeacherReport),
          }),
        }),
        groups: new Route('/groups').with({
          teacherGroups: new Route('/teachers', TeacherGroups).privileges('teacher.groups.*').with({
            addTeacherGroup: new Route('/create', CreateTeacherGroup).privileges('teacher.groups.create'),
            viewTeacherGroup: new Route('/view/:groupId', ViewGroup).privileges('teacher.groups.view'),
          }),
          studentGroups: new Route('/students', StudentGroups).privileges('student.groups.*').with({
            addStudentGroup: new Route('/create', CreateStudentGroup).privileges('student.groups.create'),
            viewStudentGroup: new Route('/view/:groupId', ViewStudentGroup).privileges('student.groups.view').with({
              updateStudentGroup: new Route('/update', UpdateStudentGroup).privileges('student.groups.update'),
            }),
          }),
        }),
        organizations: new Route('/organizations', Organizations).privileges('organizations.*').with({
          createOrganization: new Route('/create', CreateOrganization).privileges('organizations.create'),
          editOrganization: new Route('/:organizationId/edit/', EditOrganization).privileges('organizations.update'),
        }),
        chat: new Route('/chat', ChatScreen),
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
  videoCall: new Route('/meeting/:meetingId', VideoCallPage).public(),
};

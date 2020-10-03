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
import MRoute from '@doorward/ui/routes/MRoute';
import { Routes } from '@doorward/ui/types';
import StudentGroups from '../screens/Groups/Students/StudentGroups';
import CreateStudentGroup from '../screens/Groups/Students/CreateStudentGroup';
import TeacherGroups from '../screens/Groups/Teachers/TeacherGroups';
import CreateTeacherGroup from '../screens/Groups/Teachers/CreateTeacherGroup';
import ViewGroup from '../screens/Groups/ViewGroup';
import Organizations from '../screens/Organizations';
import CreateOrganization from '../screens/Organizations/CreateOrganization';
import EditOrganization from '../screens/Organizations/EditOrganization';
import ChatScreen from '../screens/ChatScreen';
import { routeNames } from './routeNames';
import AssignmentsList from '../screens/Courses/Modules/AssignmentsList';
import Classrooms from '../screens/Classrooms';
import SchoolClassrooms from '../screens/Classrooms/SchoolClassrooms';
import ViewStudent from '../screens/Students/ViewStudent';
import ViewStudentGroup from '../screens/Groups/Students/ViewStudentGroup';
import UpdateStudentGroup from '../screens/Groups/Students/UpdateStudentGroup';

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

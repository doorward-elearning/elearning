import Error404 from '../screens/ErrorPages/Error404';
import ViewCourse from '../screens/Courses/ViewCourse';
import Dashboard from '../screens/Dashboard';
import Courses from '../screens/Courses';
import AddModulePage from '../screens/Courses/Modules/AddModulePage';
import ViewModuleItem from '../screens/Courses/Modules/ViewModuleItem';
import CourseMemberList from '../screens/Courses/CourseMemberList';
import TeacherList from '../screens/Teachers/TeacherList';
import MemberReport from '../screens/Reports/MemberReport';
import CreatePassword from '../screens/Password/CreatePassword';
import Home from '../screens/Home';
import AddTeacher from '../screens/Teachers/AddTeacher';
import VideoCallPage from '../screens/VideoCallPage';
import MemberList from '../screens/Members/MemberList';
import AddCourseMember from '../screens/Members/AddCourseMember';
import TeacherReport from '../screens/Reports/TeacherReport';
import MemberListReport from '../screens/Reports/MemberListReport';
import Login from '../screens/Login';
import ForgotPassword from '../screens/Password/ForgotPassword';
import TeacherListReport from '../screens/Reports/TeacherListReport';
import Register from '../screens/Register';
import CreateAssignment from '../screens/Courses/Modules/CreateAssignment';
import AddMember from '../screens/Members/AddMember';
import CreateQuiz from '../screens/Courses/Modules/CreateQuiz';
import Profile from '../screens/Profile';
import MRoute from '@doorward/ui/routes/MRoute';
import { Routes } from '@doorward/ui/types';
import { Roles } from '@doorward/ui/components/RolesManager';
import MemberGroups from '../screens/Groups/Members/MemberGroups';
import CreateMemberGroup from '../screens/Groups/Members/CreateMemberGroup';
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
import ViewMember from '../screens/Members/ViewMember';
import ViewMemberGroup from '../screens/Groups/Members/ViewMemberGroup';
import UpdateMemberGroup from '../screens/Groups/Members/UpdateMemberGroup';

export type DoorwardRoutes = typeof routeNames;

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
        courses: new Route('/meetings').with({
          courseList: new Route('/', Courses).with({
            viewCourse: new Route('/:courseId', ViewCourse).with({
              courseMembers: new Route('/members', CourseMemberList).with({
                addCourseMember: new Route('/new', AddCourseMember),
              }),
              modules: new Route('/modules').with({
                moduleItems: new Route('/:moduleId/items').with({
                  viewModuleItem: new Route('/:itemId', ViewModuleItem),
                  editModuleItem: new Route('/:itemId/edit', ViewModuleItem).roles(Roles.TEACHER),
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
        members: new Route('/members').roles(Roles.TEACHER).with({
          memberList: new Route('/', MemberList).roles(Roles.TEACHER).with({
            viewMember: new Route('/:memberId', ViewMember).roles(Roles.TEACHER),
          }),
          newMember: new Route('/create', AddMember).roles(Roles.TEACHER),
        }),
        teachers: new Route('/moderators').roles(Roles.SUPER_ADMINISTRATOR).with({
          teacherList: new Route('/', TeacherList).roles(Roles.SUPER_ADMINISTRATOR),
          addTeacher: new Route('/create', AddTeacher).roles(Roles.SUPER_ADMINISTRATOR),
        }),
        myProfile: new Route('/profile/:username', Profile).with({
          changePassword: new Route('/changePassword', Profile),
        }),
        reports: new Route('/reports').roles(Roles.TEACHER).with({
          memberListReports: new Route('/members', MemberListReport).with({
            memberReport: new Route('/:memberId', MemberReport),
          }),
          courseListReports: new Route('/meetings', Error404),
          teacherListReports: new Route('/moderators', TeacherListReport).roles().with({
            teacherReport: new Route('/:teacherId', TeacherReport),
          }),
        }),
        groups: new Route('/groups').roles(Roles.SUPER_ADMINISTRATOR, Roles.TEACHER).with({
          teacherGroups: new Route('/moderators', TeacherGroups).roles(Roles.SUPER_ADMINISTRATOR).with({
            addTeacherGroup: new Route('/create', CreateTeacherGroup).roles(Roles.SUPER_ADMINISTRATOR),
            viewTeacherGroup: new Route('/view/:groupId', ViewGroup).roles(Roles.SUPER_ADMINISTRATOR),
          }),
          memberGroups: new Route('/members', MemberGroups).roles(Roles.TEACHER).with({
            addMemberGroup: new Route('/create', CreateMemberGroup).roles(Roles.TEACHER),
            viewMemberGroup: new Route('/view/:groupId', ViewMemberGroup).roles(Roles.TEACHER).with({
              updateMemberGroup: new Route('/update', UpdateMemberGroup).roles(Roles.TEACHER),
            }),
          }),
        }),
        organizations: new Route('/organizations', Organizations)
          .roles(Roles.SUPER_ADMINISTRATOR, (user, organization) => {
            return organization.id === process.env.DEFAULT_ORGANIZATION_ID;
          })
          .with({
            createOrganization: new Route('/create', CreateOrganization).roles(Roles.SUPER_ADMINISTRATOR),
            editOrganization: new Route('/:organizationId/edit/', EditOrganization).roles(Roles.SUPER_ADMINISTRATOR),
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

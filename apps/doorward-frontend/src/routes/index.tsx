import Error404 from '../screens/ErrorPages/Error404';
import ViewConference from '../screens/Conferences/ViewConference';
import Dashboard from '../screens/Dashboard';
import Conferences from '../screens/Conferences';
import AddModulePage from '../screens/Conferences/Modules/AddModulePage';
import ViewModuleItem from '../screens/Conferences/Modules/ViewModuleItem';
import ConferenceMemberList from '../screens/Conferences/ConferenceMemberList';
import ModeratorList from '../screens/Moderators/ModeratorList';
import MemberReport from '../screens/Reports/MemberReport';
import CreatePassword from '../screens/Password/CreatePassword';
import Home from '../screens/Home';
import AddModerator from '../screens/Moderators/AddModerator';
import VideoCallPage from '../screens/VideoCallPage';
import MemberList from '../screens/Members/MemberList';
import AddConferenceMember from '../screens/Members/AddConferenceMember';
import ModeratorReport from '../screens/Reports/ModeratorReport';
import MemberListReport from '../screens/Reports/MemberListReport';
import Login from '../screens/Login';
import ForgotPassword from '../screens/Password/ForgotPassword';
import ModeratorListReport from '../screens/Reports/ModeratorListReport';
import Register from '../screens/Register';
import CreateAssignment from '../screens/Conferences/Modules/CreateAssignment';
import AddMember from '../screens/Members/AddMember';
import CreateQuiz from '../screens/Conferences/Modules/CreateQuiz';
import Profile from '../screens/Profile';
import MRoute from '@doorward/ui/routes/MRoute';
import { Routes } from '@doorward/ui/types';
import { Roles } from '@doorward/ui/components/RolesManager';
import MemberGroups from '../screens/Groups/Members/MemberGroups';
import CreateMemberGroup from '../screens/Groups/Members/CreateMemberGroup';
import ModeratorGroups from '../screens/Groups/Moderators/ModeratorGroups';
import CreateModeratorGroup from '../screens/Groups/Moderators/CreateModeratorGroup';
import ViewGroup from '../screens/Groups/ViewGroup';
import Organizations from '../screens/Organizations';
import CreateOrganization from '../screens/Organizations/CreateOrganization';
import EditOrganization from '../screens/Organizations/EditOrganization';
import ChatScreen from '../screens/ChatScreen';
import { routeNames } from './routeNames';
import AssignmentsList from '../screens/Conferences/Modules/AssignmentsList';
import Classrooms from '../screens/Classrooms';
import SchoolClassrooms from '../screens/Classrooms/SchoolClassrooms';
import ViewMember from '../screens/Members/ViewMember';
import ViewMemberGroup from '../screens/Groups/Members/ViewMemberGroup';
import UpdateMemberGroup from '../screens/Groups/Members/UpdateMemberGroup';
import Elections from '../screens/Elections';
import ViewElection from '../screens/Elections/ViewElection';
import AddNominee from '../screens/Elections/AddNominee';

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
        conferences: new Route('/conferences').with({
          conferenceList: new Route('/', Conferences).with({
            viewConference: new Route('/:conferenceId', ViewConference).with({
              createPoll: new Route('/createPoll', ViewConference).roles(Roles.MODERATOR),
              conferenceMembers: new Route('/members', ConferenceMemberList).with({
                addConferenceMember: new Route('/new', AddConferenceMember),
              }),
              modules: new Route('/modules').with({
                moduleItems: new Route('/:moduleId/items').with({
                  viewModuleItem: new Route('/:itemId', ViewModuleItem),
                  editModuleItem: new Route('/:itemId/edit', ViewModuleItem).roles(Roles.MODERATOR),
                  addModulePage: new Route('/create/page', AddModulePage),
                  addAssignment: new Route('/create/assignment', CreateAssignment),
                  addQuiz: new Route('/create/quiz', CreateQuiz),
                }),
                assignmentList: new Route('/assignments', AssignmentsList),
              }),
            }),
          }),
          createConference: new Route('/create', Conferences),
        }),
        members: new Route('/members').roles(Roles.MODERATOR).with({
          memberList: new Route('/', MemberList).roles(Roles.MODERATOR).with({
            viewMember: new Route('/:memberId', ViewMember).roles(Roles.MODERATOR),
          }),
          newMember: new Route('/create', AddMember).roles(Roles.MODERATOR),
        }),
        moderators: new Route('/moderators').roles(Roles.SUPER_ADMINISTRATOR).with({
          moderatorList: new Route('/', ModeratorList).roles(Roles.SUPER_ADMINISTRATOR),
          addModerator: new Route('/create', AddModerator).roles(Roles.SUPER_ADMINISTRATOR),
        }),
        myProfile: new Route('/profile/:username', Profile).with({
          changePassword: new Route('/changePassword', Profile),
        }),
        reports: new Route('/reports').roles(Roles.MODERATOR).with({
          memberListReports: new Route('/members', MemberListReport).with({
            memberReport: new Route('/:memberId', MemberReport),
          }),
          conferenceListReports: new Route('/meetings', Error404),
          moderatorListReports: new Route('/moderators', ModeratorListReport).roles().with({
            moderatorReport: new Route('/:moderatorId', ModeratorReport),
          }),
        }),
        groups: new Route('/groups').roles(Roles.SUPER_ADMINISTRATOR, Roles.MODERATOR).with({
          moderatorGroups: new Route('/moderators', ModeratorGroups).roles(Roles.SUPER_ADMINISTRATOR).with({
            addModeratorGroup: new Route('/create', CreateModeratorGroup).roles(Roles.SUPER_ADMINISTRATOR),
            viewModeratorGroup: new Route('/view/:groupId', ViewGroup).roles(Roles.SUPER_ADMINISTRATOR),
          }),
          memberGroups: new Route('/members', MemberGroups).roles(Roles.MODERATOR).with({
            addMemberGroup: new Route('/create', CreateMemberGroup).roles(Roles.MODERATOR),
            viewMemberGroup: new Route('/view/:groupId', ViewMemberGroup).roles(Roles.MODERATOR).with({
              updateMemberGroup: new Route('/update', UpdateMemberGroup).roles(Roles.MODERATOR),
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
        elections: new Route('/elections').with({
          electionList: new Route('/', Elections).with({
            viewElection: new Route('/:electionId', ViewElection).with({
              addNominee: new Route('/addNominee', AddNominee).roles(Roles.MODERATOR),
            }),
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
  videoCall: new Route('/meeting/:meetingId', VideoCallPage).public(),
};

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import '@doorward/ui/fonts.scss';
import '@material/react-linear-progress/dist/linear-progress.css';
import 'react-virtualized/styles.css'; // only needs to be imported once
import RolesManager from '@doorward/ui/components/RolesManager';
import ApplicationTheme from '@doorward/ui/components/ApplicationTheme';
import useOfflineToast from '@doorward/ui/hooks/useOfflineToast';
import ApiRequest from '@doorward/common/net/apiRequest';
import ApplicationInitializer from './components/ApplicationInitializer';
import useAuth from './hooks/useAuth';
import ChatWebSocketContext from '@doorward/chat/components/ChatWebSocketContext';
import Notifications from '@doorward/ui/components/Notifications';
import { BrowserRouter, Switch } from 'react-router-dom';
import PageRoute from './routes/PageRoute';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Classrooms from './screens/Classrooms';
import SchoolClassrooms from './screens/Classrooms/SchoolClassrooms';
import CreatePassword from './screens/Password/CreatePassword';
import ForgotPassword from './screens/Password/ForgotPassword';
import VideoCallPage from './screens/VideoCallPage';
import Dashboard from './screens/Dashboard';
import Assessment from './screens/Assessment';
import Courses from './screens/Courses';
import ViewCourse from './screens/Courses/ViewCourse';
import CourseStudentList from './screens/Courses/CourseStudentList';
import AddCourseStudent from './screens/Students/AddCourseStudent';
import ViewModuleItem from './screens/Courses/Modules/ViewModuleItem';
import AddModulePage from './screens/Courses/Modules/AddModulePage';
import CreateAssignment from './screens/Courses/Modules/CreateAssignment';
import CreateQuiz from './screens/Courses/Modules/CreateQuiz';
import CreateExam from './screens/Courses/Modules/CreateExam';
import AddModuleVideo from './screens/Courses/Modules/AddModuleVideo';
import AssignmentsList from './screens/Courses/Modules/AssignmentsList';
import DiscussionGroup from './screens/DiscussionGroup';
import StudentList from './screens/Students/StudentList';
import AddStudent from './screens/Students/AddStudent';
import ViewStudent from './screens/Students/ViewStudent';
import TeacherList from './screens/Teachers/TeacherList';
import AddTeacher from './screens/Teachers/AddTeacher';
import Profile from './screens/Profile';
import StudentListReport from './screens/Reports/StudentListReport';
import StudentReport from './screens/Reports/StudentReport';
import Error404 from './screens/ErrorPages/Error404';
import TeacherListReport from './screens/Reports/TeacherListReport';
import TeacherReport from './screens/Reports/TeacherReport';
import TeacherGroups from './screens/Groups/Teachers/TeacherGroups';
import CreateTeacherGroup from './screens/Groups/Teachers/CreateTeacherGroup';
import ViewGroup from './screens/Groups/ViewGroup';
import StudentGroups from './screens/Groups/Students/StudentGroups';
import CreateStudentGroup from './screens/Groups/Students/CreateStudentGroup';
import ViewStudentGroup from './screens/Groups/Students/ViewStudentGroup';
import UpdateStudentGroup from './screens/Groups/Students/UpdateStudentGroup';
import Organizations from './screens/Organizations';
import CreateOrganization from './screens/Organizations/CreateOrganization';
import EditOrganization from './screens/Organizations/EditOrganization';
import ChatScreen from './screens/ChatScreen';
import ROUTES from '@doorward/common/frontend/routes/main';

// ensure the user is logged in
ApiRequest.setAuth();

const Router: React.FunctionComponent = (props): JSX.Element => {
  return (
    <Switch>
      <PageRoute public path={ROUTES.home} component={Home} />
      <PageRoute public path={ROUTES.auth.login} component={Login} />
      <PageRoute public path={ROUTES.auth.register} component={Register} />
      <PageRoute public path={ROUTES.classrooms.list} component={Classrooms} />
      <PageRoute public path={ROUTES.classrooms.classroom} component={SchoolClassrooms} />
      <PageRoute public path={ROUTES.auth.password.create} component={CreatePassword} />
      <PageRoute public path={ROUTES.auth.password.reset} component={CreatePassword} />
      <PageRoute public path={ROUTES.auth.password.forgot} component={ForgotPassword} />
      <PageRoute public path={ROUTES.meeting.join} component={VideoCallPage} />
      <PageRoute path={ROUTES.dashboard} component={Dashboard} />
      <PageRoute path={ROUTES.assessments.exam} component={Assessment} />
      <PageRoute path={ROUTES.assessments.quiz} component={Assessment} />
      <PageRoute path={ROUTES.courses.list} component={Courses} />
      <PageRoute path={ROUTES.courses.create} component={Courses} />
      <PageRoute path={ROUTES.courses.view} component={ViewCourse} />
      <PageRoute path={ROUTES.courses.students.list} component={CourseStudentList} />
      <PageRoute path={ROUTES.courses.students.create} component={AddCourseStudent} />
      <PageRoute path={ROUTES.courses.modules.items.view} component={ViewModuleItem} />
      <PageRoute
        path={ROUTES.courses.modules.items.update}
        component={ViewModuleItem}
        privileges={['moduleItems.update']}
      />
      <PageRoute path={ROUTES.courses.modules.pages.create} component={AddModulePage} />
      <PageRoute path={ROUTES.courses.modules.assignments.create} component={CreateAssignment} />
      <PageRoute path={ROUTES.courses.modules.quizzes.create} component={CreateQuiz} />
      <PageRoute path={ROUTES.courses.modules.exams.create} component={CreateExam} />
      <PageRoute path={ROUTES.courses.modules.videos.create} component={AddModuleVideo} />
      <PageRoute path={ROUTES.courses.modules.assignments.list} component={AssignmentsList} />
      <PageRoute path={ROUTES.courses.discussionGroups.view} component={DiscussionGroup} />
      <PageRoute path={ROUTES.students.list} component={StudentList} privileges={['students.*']} />
      <PageRoute path={ROUTES.students.create} component={AddStudent} privileges={['students.create']} />
      <PageRoute path={ROUTES.students.view} component={ViewStudent} privileges={['students.*']} />
      <PageRoute path={ROUTES.teachers.list} component={TeacherList} privileges={['teachers.*']} />
      <PageRoute path={ROUTES.teachers.create} component={AddTeacher} privileges={['teachers.create']} />
      <PageRoute path={ROUTES.profile.view} component={Profile} />
      <PageRoute path={ROUTES.profile.changePassword} component={Profile} />
      <PageRoute path={ROUTES.reports.students.list} component={StudentListReport} privileges={['reports.*']} />
      <PageRoute path={ROUTES.reports.students.view} component={StudentReport} privileges={['reports.*']} />
      <PageRoute path={ROUTES.reports.courses.list} component={Error404} privileges={['reports.*']} />
      <PageRoute path={ROUTES.reports.teachers.list} component={TeacherListReport} privileges={['reports.*']} />
      <PageRoute path={ROUTES.reports.teachers.view} component={TeacherReport} privileges={['reports.*']} />
      <PageRoute path={ROUTES.groups.teachers.list} component={TeacherGroups} privileges={['teacher.groups.*']} />
      <PageRoute
        path={ROUTES.groups.teachers.create}
        component={CreateTeacherGroup}
        privileges={['teacher.groups.create']}
      />
      <PageRoute path={ROUTES.groups.teachers.view} component={ViewGroup} privileges={['teacher.groups.view']} />
      <PageRoute path={ROUTES.groups.students.list} component={StudentGroups} privileges={['student.groups.*']} />
      <PageRoute
        path={ROUTES.groups.students.create}
        component={CreateStudentGroup}
        privileges={['student.groups.create']}
      />
      <PageRoute path={ROUTES.groups.students.view} component={ViewStudentGroup} privileges={['student.groups.view']} />
      <PageRoute
        path={ROUTES.groups.students.update}
        component={UpdateStudentGroup}
        privileges={['student.groups.update']}
      />
      <PageRoute path={ROUTES.organizations.list} component={Organizations} privileges={['organizations.*']} />
      <PageRoute
        path={ROUTES.organizations.create}
        component={CreateOrganization}
        privileges={['organizations.create']}
      />
      <PageRoute
        path={ROUTES.organizations.update}
        component={EditOrganization}
        privileges={['organizations.update']}
      />
      <PageRoute path={ROUTES.chat.home} component={ChatScreen} />
      <PageRoute exact={false} public path="*" component={Error404} />
    </Switch>
  );
};

const App: React.FC = () => {
  useOfflineToast();

  const auth = useAuth();

  return (
    <ApplicationTheme theme="base">
      <Notifications>
        <ApplicationInitializer>
          <BrowserRouter>
            <RolesManager auth={auth}>
              <ChatWebSocketContext auth={auth} path={ROUTES.chat.home}>
                <Router />
              </ChatWebSocketContext>
            </RolesManager>
          </BrowserRouter>
        </ApplicationInitializer>
      </Notifications>
    </ApplicationTheme>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

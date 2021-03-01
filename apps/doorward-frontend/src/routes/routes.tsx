import React from 'react';
import { Switch } from 'react-router-dom';
import Error404 from '../screens/ErrorPages/Error404';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Classrooms from '../screens/Classrooms';
import SchoolClassrooms from '../screens/Classrooms/SchoolClassrooms';
import Dashboard from '../screens/Dashboard';
import Assessment from '../screens/Assessment';
import Courses from '../screens/Courses';
import ViewCourse from '../screens/Courses/ViewCourse';
import CourseStudentList from '../screens/Courses/CourseStudentList';
import AddCourseStudent from '../screens/Students/AddCourseStudent';
import ViewModuleItem from '../screens/Courses/Modules/ViewModuleItem';
import AddModulePage from '../screens/Courses/Modules/AddModulePage';
import CreateAssignment from '../screens/Courses/Modules/CreateAssignment';
import CreateQuiz from '../screens/Courses/Modules/CreateQuiz';
import CreateExam from '../screens/Courses/Modules/CreateExam';
import AddModuleVideo from '../screens/Courses/Modules/AddModuleVideo';
import AssignmentsList from '../screens/Courses/Modules/AssignmentsList';
import DiscussionGroup from '../screens/DiscussionGroup';
import StudentList from '../screens/Students/StudentList';
import AddStudent from '../screens/Students/AddStudent';
import ViewStudent from '../screens/Students/ViewStudent';
import TeacherList from '../screens/Teachers/TeacherList';
import AddTeacher from '../screens/Teachers/AddTeacher';
import Profile from '../screens/Profile';
import StudentListReport from '../screens/Reports/StudentListReport';
import StudentReport from '../screens/Reports/StudentReport';
import TeacherListReport from '../screens/Reports/TeacherListReport';
import TeacherReport from '../screens/Reports/TeacherReport';
import TeacherGroups from '../screens/Groups/Teachers/TeacherGroups';
import CreateTeacherGroup from '../screens/Groups/Teachers/CreateTeacherGroup';
import ViewGroup from '../screens/Groups/ViewGroup';
import StudentGroups from '../screens/Groups/Students/StudentGroups';
import CreateStudentGroup from '../screens/Groups/Students/CreateStudentGroup';
import ViewStudentGroup from '../screens/Groups/Students/ViewStudentGroup';
import UpdateStudentGroup from '../screens/Groups/Students/UpdateStudentGroup';
import Organizations from '../screens/Organizations';
import CreateOrganization from '../screens/Organizations/CreateOrganization';
import EditOrganization from '../screens/Organizations/EditOrganization';
import ChatScreen from '../screens/ChatScreen';
import CreatePassword from '../screens/Password/CreatePassword';
import ForgotPassword from '../screens/Password/ForgotPassword';
import VideoCallPage from '../screens/VideoCallPage';
import PageRoute from './PageRoute';

export const Router: React.FunctionComponent<any> = (): JSX.Element => {
  return (
    <Switch>
      <PageRoute public path="/" exact component={Home} />
      <PageRoute public path="/login" exact component={Login} />
      <PageRoute public path="/register" exact component={Register} />
      <PageRoute public path="/classrooms" exact component={Classrooms} />
      <PageRoute public path="/classrooms/:schoolId" exact component={SchoolClassrooms} />
      <PageRoute public path="/password/create/:resetToken" exact component={CreatePassword} />
      <PageRoute public path="/password/reset/:resetToken" exact component={CreatePassword} />
      <PageRoute public path="/password/forgot" exact component={ForgotPassword} />
      <PageRoute public path="/meeting/:meetingId" exact component={VideoCallPage} />
      <PageRoute public path="*" component={Error404} />
      <PageRoute path="/dashboard" exact component={Dashboard} />
      <PageRoute path="/exam/:assessmentId" exact component={Assessment} />
      <PageRoute path="/quiz/:assessmentId" exact component={Assessment} />
      <PageRoute path="/courses" exact component={Courses} />
      <PageRoute path="/courses/create" exact component={Courses} />
      <PageRoute path="/courses/:courseId" exact component={ViewCourse} />
      <PageRoute path="/courses/:courseId/students" exact component={CourseStudentList} />
      <PageRoute path="/courses/:courseId/students/new" exact component={AddCourseStudent} />
      <PageRoute path="/moduleItems/:itemId" exact component={ViewModuleItem} />
      <PageRoute
        path="/moduleItems/:itemId/update"
        exact
        component={ViewModuleItem}
        privileges={['moduleItems.update']}
      />
      <PageRoute path="/modules/:moduleId/pages/create" exact component={AddModulePage} />
      <PageRoute path="/modules/:moduleId/assignments/create" exact component={CreateAssignment} />
      <PageRoute path="/modules/:moduleId/quizzes/create" exact component={CreateQuiz} />
      <PageRoute path="/modules/:moduleId/exams/create" exact component={CreateExam} />
      <PageRoute path="/modules/:moduleId/videos/create" exact component={AddModuleVideo} />
      <PageRoute path="/assignments/:courseId" exact component={AssignmentsList} />
      <PageRoute path="/discussionGroups/:discussionGroupId" exact component={DiscussionGroup} />
      <PageRoute path="/students" exact component={StudentList} privileges={['students.*']} />
      <PageRoute path="/students/create" exact component={AddStudent} privileges={['students.create']} />
      <PageRoute path="/students/:studentId" exact component={ViewStudent} privileges={['students.*']} />
      <PageRoute path="/teachers" exact component={TeacherList} privileges={['teachers.*']} />
      <PageRoute path="/teachers/create" exact component={AddTeacher} privileges={['teachers.create']} />
      <PageRoute path="/profile/:username" exact component={Profile} />
      <PageRoute path="/profile/:username/changePassword" exact component={Profile} />
      <PageRoute path="/reports/students" exact component={StudentListReport} privileges={['reports.*']} />
      <PageRoute path="/reports/students/:studentId" exact component={StudentReport} privileges={['reports.*']} />
      <PageRoute path="/reports/courses" exact component={Error404} privileges={['reports.*']} />
      <PageRoute path="/reports/teachers" exact component={TeacherListReport} privileges={['reports.*']} />
      <PageRoute path="/reports/teachers/:teacherId" exact component={TeacherReport} privileges={['reports.*']} />
      <PageRoute path="/groups/teachers" exact component={TeacherGroups} privileges={['teacher.groups.*']} />
      <PageRoute
        path="/groups/teachers/create"
        exact
        component={CreateTeacherGroup}
        privileges={['teacher.groups.create']}
      />
      <PageRoute path="/groups/teachers/:groupId" exact component={ViewGroup} privileges={['teacher.groups.view']} />
      <PageRoute path="/groups/students" exact component={StudentGroups} privileges={['student.groups.*']} />
      <PageRoute
        path="/groups/students/create"
        exact
        component={CreateStudentGroup}
        privileges={['student.groups.create']}
      />
      <PageRoute
        path="/groups/students/:groupId"
        exact
        component={ViewStudentGroup}
        privileges={['student.groups.view']}
      />
      <PageRoute
        path="/groups/students/:groupId/update"
        exact
        component={UpdateStudentGroup}
        privileges={['student.groups.update']}
      />
      <PageRoute path="/organizations" exact component={Organizations} privileges={['organizations.*']} />
      <PageRoute
        path="/organizations/create"
        exact
        component={CreateOrganization}
        privileges={['organizations.create']}
      />
      <PageRoute
        path="/organizations/:organizationId/update"
        exact
        component={EditOrganization}
        privileges={['organizations.update']}
      />
      <PageRoute path="/chat" exact component={ChatScreen} />
    </Switch>
  );
};

import { UseRoutes } from '../../../hooks/useRoutes';
import { SideBarProps } from './index';

export default (routes: UseRoutes, props: SideBarProps, logout: () => void) => [
  {
    ...routes.dashboard,
    icon: 'dashboard',
  },
  {
    ...routes.courses,
    icon: 'school',
    subMenu: [routes.courseList],
  },
  {
    ...routes.students,
    icon: 'account_circle',
    subMenu: [routes.studentList, routes.newStudent],
  },
  {
    ...routes.reports,
    icon: 'trending_up',
    subMenu: [routes.studentReports, routes.teacherReports, routes.courseReports],
  },
  {
    name: 'Logout',
    onClick: (): void => {
      logout();
      props.history.push(routes.login.link);
    },
    icon: 'logout',
    link: '',
  },
];

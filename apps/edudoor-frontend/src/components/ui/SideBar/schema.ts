import { UseRoutes } from '../../../hooks/useRoutes';
import { SideBarProps } from './index';
import { MenuItem } from '../../../hooks/useSidebarSchema';

export default (routes: UseRoutes, props: SideBarProps, logout: () => void): Array<MenuItem> => [
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
    ...routes.teachers,
    icon: 'people',
    subMenu: [routes.teacherList, routes.addTeacher],
  },
  {
    ...routes.reports,
    icon: 'trending_up',
    subMenu: [routes.studentListReports, routes.teacherListReports],
  },
  {
    name: 'Logout',
    onClick: (): void => {
      logout();
      props.history.push(routes.login.link);
    },
    icon: 'exit_to_app',
    link: '',
  },
];

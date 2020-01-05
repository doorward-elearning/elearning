import { SideBarProps } from '@edudoor/ui/src/components/SideBar';
import { MenuItem } from '@edudoor/ui/src/hooks/useSidebarSchema';
import { Routes } from '@edudoor/ui/src/types';
import { EdudoorRoutes } from '../../routes';
import useAuth from '@edudoor/ui/src/hooks/useAuth';

export default (routes: Routes<EdudoorRoutes>, props: SideBarProps<EdudoorRoutes>): Array<MenuItem> => {
  const { logout } = useAuth();
  return [
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
};

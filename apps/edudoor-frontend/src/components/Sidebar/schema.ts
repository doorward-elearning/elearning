import { SideBarProps } from '@edudoor/ui/components/SideBar';
import { MenuItem } from '@edudoor/ui/hooks/useSidebarSchema';
import { Routes } from '@edudoor/ui/types';
import { EdudoorRoutes } from '../../routes';
import useAuth from '@edudoor/ui/hooks/useAuth';

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
      icon: 'work',
      subMenu: [routes.teacherList, routes.addTeacher],
    },
    {
      ...routes.groups,
      icon: 'people',
      subMenu: [routes.studentGroups, routes.teacherGroups],
    },
    {
      ...routes.reports,
      icon: 'trending_up',
      subMenu: [routes.studentListReports, routes.teacherListReports],
    },
    {
      ...routes.organizations,
      icon: 'meeting_room',
    },
    {
      name: 'Logout',
      onClick: (): void => {
        logout();
        window.location.href = routes.login.link;
      },
      icon: 'exit_to_app',
      link: '',
    },
  ];
};

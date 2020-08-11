import { SideBarProps } from '@doorward/ui/components/SideBar';
import { MenuItem } from '@doorward/ui/hooks/useSidebarSchema';
import { Routes } from '@doorward/ui/types';
import { DoorwardRoutes } from '../../routes';
import useAuth from '@doorward/ui/hooks/useAuth';

export default (routes: Routes<DoorwardRoutes>, props: SideBarProps<DoorwardRoutes>): Array<MenuItem> => {
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
      ...routes.members,
      icon: 'account_circle',
      subMenu: [routes.memberList, routes.newMember],
    },
    {
      ...routes.teachers,
      icon: 'work',
      subMenu: [routes.teacherList, routes.addTeacher],
    },
    {
      ...routes.groups,
      icon: 'people',
      subMenu: [routes.memberGroups, routes.teacherGroups],
    },
    {
      ...routes.reports,
      icon: 'trending_up',
      subMenu: [routes.memberListReports, routes.teacherListReports],
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

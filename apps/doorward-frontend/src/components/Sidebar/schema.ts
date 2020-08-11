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
      ...routes.forums,
      icon: 'school',
      subMenu: [routes.forumList],
    },
    {
      ...routes.members,
      icon: 'account_circle',
      subMenu: [routes.memberList, routes.newMember],
    },
    {
      ...routes.moderators,
      icon: 'work',
      subMenu: [routes.moderatorList, routes.addModerator],
    },
    {
      ...routes.groups,
      icon: 'people',
      subMenu: [routes.memberGroups, routes.moderatorGroups],
    },
    {
      ...routes.reports,
      icon: 'trending_up',
      subMenu: [routes.memberListReports, routes.moderatorListReports],
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

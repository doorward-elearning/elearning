import { SideBarSubMenuProps } from '../components/ui/SideBar/SideBarSubMenu';
import { SideBarProps } from '../components/ui/SideBar';
import { BreadCrumb } from '../components/ui/BreadCrumbs';
import useRoutes from './useRoutes';
import useAuth from './useAuth';
import { Roles } from '../components/static/RolesManager';
import { Role } from '../services/models';

const useSidebarSchema = (
  props: SideBarProps
): {
  sidebar: Array<MenuItem>;
  selected: string;
} => {
  const routes = useRoutes();
  const { logout } = useAuth();
  const sidebar: Array<MenuItem> = [
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
      name: 'Logout',
      onClick: (): void => {
        logout();
        props.history.push(routes.login.link);
      },
      icon: 'logout',
      link: '',
    },
  ];
  let selected = '';

  if (routes.currentRoute) {
    const currentRoute = routes[routes.currentRoute];
    for (let i = currentRoute.tree.length - 1; i >= 0; i--) {
      const link = routes[currentRoute.tree[i]].matchURL;
      sidebar.forEach(item => {
        if (!selected) {
          if (item.link === link) {
            selected = link;
          }
          const subMenu = item.subMenu;
          if (subMenu) {
            subMenu.forEach(menuItem => {
              if (!selected) {
                if (menuItem.link === link) {
                  selected = link;
                }
              }
            });
          }
        }
      });
    }
  }

  return {
    sidebar,
    selected,
  };
};

export interface SubMenuItem extends BreadCrumb {
  onClick?: (props: SideBarSubMenuProps) => void;
}

export interface MenuItem extends BreadCrumb {
  icon: string;
  subMenu?: Array<SubMenuItem>;
  onClick?: () => void;
}

export default useSidebarSchema;

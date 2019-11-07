import { SideBarSubMenuProps } from '../components/ui/SideBar/SideBarSubMenu';
import { SideBarProps } from '../components/ui/SideBar';
import { BreadCrumb } from '../components/ui/BreadCrumbs';
import useRoutes from './useRoutes';
import useAuth from './useAuth';

const useSidebarSchema = (props: SideBarProps): Array<MenuItem> => {
  const { routes } = useRoutes();
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
      name: 'Logout',
      onClick: (): void => {
        logout();
        props.history.push(routes.login.link);
      },
      icon: 'logout',
      link: '',
    },
  ];
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

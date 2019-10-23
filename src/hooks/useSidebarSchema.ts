import { SideBarSubMenuProps } from '../components/ui/SideBar/SideBarSubMenu';
import ROUTES from '../routes/routes';
import { SideBarProps } from '../components/ui/SideBar';
import useAuth from './useAuth';

const useSidebarSchema = (props: SideBarProps): Array<MenuItem> => {
  const { logout } = useAuth();
  return [
    {
      title: 'Dashboard',
      link: ROUTES.dashboard.link,
      icon: 'dashboard',
    },
    {
      title: 'Courses',
      link: ROUTES.courses.link,
      icon: 'school',
      subMenu: [
        {
          title: 'Course List',
          link: ROUTES.courseList.link,
        },
      ],
    },
    {
      title: 'Logout',
      onClick: (): void => {
        logout();
        props.history.push(ROUTES.login.link);
      },
      icon: 'logout',
    },
  ];
};

export interface SubMenuItem {
  title: string;
  link: string;
  onClick?: (props: SideBarSubMenuProps) => void;
}

export interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  subMenu?: Array<SubMenuItem>;
  onClick?: () => void;
}

export default useSidebarSchema;

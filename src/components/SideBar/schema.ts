import { routes } from '../../routes';
import { SideBarSubMenuProps } from './SideBarSubMenu';
import { ItemProps } from './SideBarMenu';
import Tools from '../../utils/Tools';

const Schema = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: 'dashboard',
  },
  {
    title: 'Courses',
    link: '/courses',
    icon: 'school',
    subMenu: [
      {
        title: 'Course List',
        link: '/courses/list',
      },
    ],
  },
  {
    title: 'Logout',
    onClick: ({ history }: ItemProps): void => {
      Tools.clearToken();
      history.push(routes.LOGIN);
    },
    icon: 'logout',
  },
];

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
  onClick?: (props: ItemProps) => void;
}

export default Schema;

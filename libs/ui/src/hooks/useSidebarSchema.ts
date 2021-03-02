import { SideBarSubMenuProps } from '../components/SideBar/SideBarSubMenu';
import { SideBarProps } from '../components/SideBar';
import { BreadCrumb } from '../components/BreadCrumbs';
import { Icons } from '../types/icons';
import { useRouteMatch } from 'react-router';

export type SideBarSchema = () => Array<MenuItem>;

function useSidebarSchema(
  props: SideBarProps
): {
  sidebar: Array<MenuItem>;
  selected: string;
} {
  const match = useRouteMatch();
  const sidebar: Array<MenuItem> = props.schema();
  let selected = match.path;

  const pathFound = sidebar.find((menu) => {
    return menu.link === selected || (menu.subMenu ? menu.subMenu.find((subMenu) => subMenu.link === selected) : false);
  });

  if (!pathFound) {
    sidebar.forEach((menu) => {
      if (menu.subMenu) {
        if (selected.startsWith(menu.link)) {
          selected = menu.link;
        }
        menu.subMenu.forEach((subMenu) => {
          if (selected.startsWith(subMenu.link)) {
            selected = subMenu.link;
          }
        });
      }
    });
  }

  return {
    sidebar,
    selected,
  };
}

export interface SubMenuItem extends BreadCrumb {
  onClick?: (props: SideBarSubMenuProps) => void;
}

export interface MenuItem extends BreadCrumb {
  icon: Icons;
  subMenu?: Array<SubMenuItem>;
  onClick?: () => void;
  hidden?: boolean;
}

export default useSidebarSchema;

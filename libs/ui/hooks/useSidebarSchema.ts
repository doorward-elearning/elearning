import { SideBarSubMenuProps } from '../components/SideBar/SideBarSubMenu';
import { SideBarProps } from '../components/SideBar';
import { BreadCrumb } from '../components/BreadCrumbs';
import useRoutes from '@edudoor/frontend/src/hooks/useRoutes';
import { Icons } from '../types/icons';
import { RouteNames, Routes } from '../types';

export type SideBarSchema<T extends RouteNames> = (
  routes: Routes<T>,
  props: SideBarProps<T>,
) => Array<MenuItem>;

function useSidebarSchema<T extends RouteNames>(
  props: SideBarProps<T>,
): {
  sidebar: Array<MenuItem>;
  selected: string;
} {
  const routes = useRoutes();
  const sidebar: Array<MenuItem> = props.schema(routes, props);
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
}

export interface SubMenuItem extends BreadCrumb {
  onClick?: (props: SideBarSubMenuProps) => void;
}

export interface MenuItem extends BreadCrumb {
  icon: Icons;
  subMenu?: Array<SubMenuItem>;
  onClick?: () => void;
}

export default useSidebarSchema;

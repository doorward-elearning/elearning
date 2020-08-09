import React, { MouseEventHandler, MutableRefObject } from 'react';
import './SideBar.scss';
import SideBarMenu from './SideBarMenu';
import { Location, MemoryHistory } from 'history';
import classNames from 'classnames';
import NavLogo from '../NavBar/NavLogo';
import IfElse from '../IfElse';
import useSidebarSchema, { MenuItem, SideBarSchema } from '../../hooks/useSidebarSchema';
import { RouteNames, Routes } from '@doorward/ui/types';
import useAuth from '../../hooks/useAuth';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import UserPanel from '@doorward/ui/components/SideBar/UserPanel';

function SideBar<T extends RouteNames>(props: SideBarProps<T>) {
  const { history, location, collapsed } = props;
  const schema = useSidebarSchema(props, props.routes);
  const { authenticated } = useAuth();

  const className = classNames({
    'eb-sideBar': true,
    collapsed,
  });
  return (
    <IfElse condition={authenticated}>
      <div className={className} ref={props.sideBarRef}>
        {!props.navBarShown && (
          <div className="sidebar-logo">
            <NavLogo
              features={[NavbarFeatures.HAMBURGER, NavbarFeatures.PAGE_LOGO]}
              onHamburgerClick={props.onHamburgerClick}
              history={props.history}
              title={props.title}
              icon={props.icon}
            />
          </div>
        )}
        <ul className="sidemenu">
          <UserPanel collapsed={collapsed} profilePicture="" />
          <SideBarMenu
            history={history}
            location={location}
            menu={schema.sidebar}
            selected={schema.selected}
            collapsed={collapsed}
            onItemSelected={props.onItemSelected}
          />
        </ul>
      </div>
    </IfElse>
  );
}

export interface SideBarProps<T extends RouteNames> {
  history: MemoryHistory;
  location: Location;
  collapsed: boolean;
  navBarShown: boolean;
  onHamburgerClick?: MouseEventHandler;
  schema: SideBarSchema<T>;
  routes: Routes<T>;
  icon: string;
  title: string;
  sideBarRef?: MutableRefObject<HTMLDivElement>;
  onItemSelected?: (item: MenuItem) => void;
}

export default SideBar;

import React, { MouseEventHandler } from 'react';
import './SideBar.scss';
import SideBarMenu from './SideBarMenu';
import { Location, MemoryHistory } from 'history';
import classNames from 'classnames';
import NavLogo from '../NavBar/NavLogo';
import IfElse from '../IfElse';
import useSidebarSchema, { SideBarSchema } from '../../hooks/useSidebarSchema';
import { RouteNames, Routes } from '@edudoor/ui/types';
import useAuth from '../../hooks/useAuth';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar/features';

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
      <div className={className}>
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
          {/*<UserPanel collapsed={collapsed} profilePicture={profile} />*/}
          <SideBarMenu
            history={history}
            location={location}
            menu={schema.sidebar}
            selected={schema.selected}
            collapsed={collapsed}
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
}

export default SideBar;
